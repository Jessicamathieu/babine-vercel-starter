// pages/api/calendar-sync.js
// Synchronisation Google Calendar - Créer/Modifier/Supprimer événements

const { google } = require('googleapis');

// Configuration Google Calendar
const CALENDAR_CONFIG = {
  serviceAccountEmail: 'babine-assistante-esthetica@babine-assistante-esthetica.iam.gserviceaccount.com',
  calendarId: 'primary', // Calendrier principal Jessica
  obeyliaCalendarId: 'obeyliagilbert@hotmail.com' // Calendrier partagé Obeylia
};

// Initialiser client Google Calendar
function getCalendarClient() {
  const credentials = JSON.parse(process.env.GOOGLE_CALENDAR_CREDENTIALS);
  
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/calendar']
  );

  return google.calendar({ version: 'v3', auth });
}

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        return await createCalendarEvent(req, res);
      case 'PUT':
        return await updateCalendarEvent(req, res);
      case 'DELETE':
        return await deleteCalendarEvent(req, res);
      case 'GET':
        return await getCalendarEvents(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('❌ Erreur Calendar API:', error);
    return res.status(500).json({ error: error.message });
  }
}

// Créer événement Google Calendar
async function createCalendarEvent(req, res) {
  const { appointment } = req.body;
  const calendar = getCalendarClient();

  // Déterminer le calendrier selon l'employée
  const calendarId = appointment.employee === 'obeylia' 
    ? CALENDAR_CONFIG.obeyliaCalendarId 
    : CALENDAR_CONFIG.calendarId;

  // Calculer heure de fin
  const startDateTime = new Date(`${appointment.date}T${appointment.time}:00`);
  const endDateTime = new Date(startDateTime.getTime() + (appointment.duration * 60000));

  const event = {
    summary: `${getServiceName(appointment.service)} - ${appointment.clientName}`,
    description: `
📋 RENDEZ-VOUS ESTHETICA SPA

👤 Client: ${appointment.clientName}
📞 Téléphone: ${appointment.phone}
📧 Email: ${appointment.email || 'Non fourni'}
💆‍♀️ Service: ${getServiceName(appointment.service)}
👩‍🔬 Employée: ${appointment.employee === 'jessica' ? 'Jessica' : 'Obeylia'}
🏠 Salle: ${getServiceRoom(appointment.service)}
💰 Prix: ${getServicePrice(appointment.service)}$
⏱️ Durée: ${appointment.duration} minutes

📝 Notes: ${appointment.notes || 'Aucune note'}

🌸 Créé par Babine - Esthetica Spa
    `.trim(),
    
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'America/Toronto'
    },
    
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'America/Toronto'
    },
    
    location: '200, 33e Rue, Notre-Dame-des-Pins, G0M 1K0',
    
    attendees: [
      { 
        email: appointment.email || 'client@estheticaspa.com',
        displayName: appointment.clientName,
        responseStatus: 'needsAction'
      },
      {
        email: 'info@estheticaspa.com',
        displayName: 'Jessica - Esthetica Spa',
        responseStatus: 'accepted'
      }
    ],
    
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 24h avant
        { method: 'email', minutes: 120 },     // 2h avant  
        { method: 'popup', minutes: 30 }       // 30min avant
      ]
    },
    
    colorId: getServiceColorId(appointment.service),
    
    source: {
      title: 'Babine - Esthetica Spa',
      url: 'https://babine.estheticaspa.com'
    }
  };

  try {
    const response = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
      sendUpdates: 'all' // Envoyer invitations
    });

    console.log(`📅 Événement créé: ${response.data.id}`);
    
    return res.status(201).json({
      success: true,
      eventId: response.data.id,
      eventUrl: response.data.htmlLink,
      message: 'Événement créé avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur création événement:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

// Mettre à jour événement existant
async function updateCalendarEvent(req, res) {
  const { eventId, appointment } = req.body;
  const calendar = getCalendarClient();

  const calendarId = appointment.employee === 'obeylia' 
    ? CALENDAR_CONFIG.obeyliaCalendarId 
    : CALENDAR_CONFIG.calendarId;

  const startDateTime = new Date(`${appointment.date}T${appointment.time}:00`);
  const endDateTime = new Date(startDateTime.getTime() + (appointment.duration * 60000));

  const updatedEvent = {
    summary: `${getServiceName(appointment.service)} - ${appointment.clientName}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'America/Toronto'
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'America/Toronto'
    }
  };

  try {
    const response = await calendar.events.update({
      calendarId: calendarId,
      eventId: eventId,
      resource: updatedEvent,
      sendUpdates: 'all'
    });

    console.log(`📅 Événement mis à jour: ${eventId}`);
    
    return res.status(200).json({
      success: true,
      eventId: response.data.id,
      message: 'Événement mis à jour'
    });

  } catch (error) {
    console.error('❌ Erreur mise à jour événement:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

// Supprimer événement
async function deleteCalendarEvent(req, res) {
  const { eventId, calendarId } = req.query;
  const calendar = getCalendarClient();

  try {
    await calendar.events.delete({
      calendarId: calendarId || CALENDAR_CONFIG.calendarId,
      eventId: eventId,
      sendUpdates: 'all'
    });

    console.log(`📅 Événement supprimé: ${eventId}`);
    
    return res.status(200).json({
      success: true,
      message: 'Événement supprimé'
    });

  } catch (error) {
    console.error('❌ Erreur suppression événement:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

// Récupérer événements existants (pour import)
async function getCalendarEvents(req, res) {
  const { startDate, endDate, employeeFilter } = req.query;
  const calendar = getCalendarClient();

  const timeMin = startDate ? new Date(startDate).toISOString() : new Date().toISOString();
  const timeMax = endDate ? new Date(endDate).toISOString() : 
    new Date(Date.now() + (6 * 30 * 24 * 60 * 60 * 1000)).toISOString(); // 6 mois

  try {
    // Récupérer de Jessica
    const jessicaEvents = await calendar.events.list({
      calendarId: CALENDAR_CONFIG.calendarId,
      timeMin: timeMin,
      timeMax: timeMax,
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 250
    });

    // Récupérer d'Obeylia si demandé
    let obeyliaEvents = { data: { items: [] } };
    if (!employeeFilter || employeeFilter === 'obeylia') {
      try {
        obeyliaEvents = await calendar.events.list({
          calendarId: CALENDAR_CONFIG.obeyliaCalendarId,
          timeMin: timeMin,
          timeMax: timeMax,
          singleEvents: true,
          orderBy: 'startTime',
          maxResults: 250
        });
      } catch (err) {
        console.warn('⚠️ Calendrier Obeylia non accessible:', err.message);
      }
    }

    // Combiner et formater les événements
    const allEvents = [
      ...jessicaEvents.data.items.map(event => ({ ...event, employee: 'jessica' })),
      ...obeyliaEvents.data.items.map(event => ({ ...event, employee: 'obeylia' }))
    ];

    const formattedEvents = allEvents.map(formatEventForApp);

    console.log(`📅 ${formattedEvents.length} événements récupérés`);

    return res.status(200).json({
      success: true,
      events: formattedEvents,
      count: formattedEvents.length
    });

  } catch (error) {
    console.error('❌ Erreur récupération événements:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

// Formatter événement Google Calendar pour l'app Babine
function formatEventForApp(event) {
  const startTime = new Date(event.start.dateTime);
  const endTime = new Date(event.end.dateTime);
  const duration = Math.round((endTime - startTime) / 60000);

  // Extraire nom client du titre
  const titleMatch = event.summary?.match(/^(.+?)\s*-\s*(.+)$/);
  const serviceName = titleMatch ? titleMatch[1].trim() : event.summary;
  const clientName = titleMatch ? titleMatch[2].trim() : 'Client';

  // Extraire téléphone de la description
  const phoneMatch = event.description?.match(/📞 Téléphone:\s*([^\n]+)/);
  const phone = phoneMatch ? phoneMatch[1].trim() : '';

  return {
    id: 'cal_' + event.id,
    googleEventId: event.id,
    clientName: clientName,
    phone: phone,
    service: mapServiceNameToKey(serviceName),
    employee: event.employee,
    date: startTime.toISOString().split('T')[0],
    time: startTime.toTimeString().slice(0, 5),
    duration: duration,
    status: 'confirmé',
    imported: true,
    source: 'google_calendar'
  };
}

// Fonctions utilitaires pour les services
function getServiceName(serviceKey) {
  const serviceMap = {
    'lipocavitation': 'Lipocavitation',
    'ipl-aisselles': 'IPL Aisselles', 
    'ipl-acne': 'IPL Acné',
    'green-filler': 'Green Filler',
    'lifting-colombien': 'Lifting Colombien',
    'pose-ongles': 'Pose Ongles',
    'pedicure': 'Pédicure',
    'bronzage': 'Bronzage'
  };
  
  return serviceMap[serviceKey] || serviceKey;
}

function getServicePrice(serviceKey) {
  const priceMap = {
    'lipocavitation': 120,
    'ipl-aisselles': 75,
    'ipl-acne': 200,
    'green-filler': 160,
    'lifting-colombien': 100,
    'pose-ongles': 55,
    'pedicure': 60,
    'bronzage': 12
  };
  
  return priceMap[serviceKey] || 0;
}

function getServiceRoom(serviceKey) {
  const roomMap = {
    'lipocavitation': 'Salle Lipo',
    'ipl-aisselles': 'Salle Lipo',
    'ipl-acne': 'Salle Soins', 
    'green-filler': 'Salle Soins',
    'lifting-colombien': 'Salle Lipo',
    'pose-ongles': 'Salle Ongles',
    'pedicure': 'Salle Ongles',
    'bronzage': 'Salle Bronzage'
  };
  
  return roomMap[serviceKey] || 'Salle Soins';
}

function getServiceColorId(serviceKey) {
  const colorMap = {
    'lipocavitation': '7', // Bleu
    'ipl-aisselles': '11', // Rouge
    'ipl-acne': '9', // Violet
    'green-filler': '10', // Vert
    'lifting-colombien': '5', // Jaune
    'pose-ongles': '6', // Orange
    'pedicure': '4', // Rose
    'bronzage': '8' // Gris
  };
  
  return colorMap[serviceKey] || '1';
}

function mapServiceNameToKey(serviceName) {
  const nameMap = {
    'Lipocavitation': 'lipocavitation',
    'IPL Aisselles': 'ipl-aisselles',
    'IPL Acné': 'ipl-acne',
    'Green Filler': 'green-filler',
    'Lifting Colombien': 'lifting-colombien',
    'Pose Ongles': 'pose-ongles',
    'Pédicure': 'pedicure',
    'Bronzage': 'bronzage'
  };
  
  return nameMap[serviceName] || 'lipocavitation';
}