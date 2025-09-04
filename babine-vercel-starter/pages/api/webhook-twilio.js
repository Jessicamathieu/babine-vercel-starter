// pages/api/webhook-twilio.js
// Webhook pour recevoir les SMS entrants et y répondre automatiquement

const twilio = require('twilio');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Valider que le webhook vient bien de Twilio
    const signature = req.headers['x-twilio-signature'];
    const isValid = twilio.validateRequest(
      process.env.TWILIO_AUTH_TOKEN,
      signature,
      req.url,
      req.body
    );

    if (!isValid) {
      console.warn('⚠️ Webhook Twilio non valide');
      return res.status(403).send('Forbidden');
    }

    // Extraire les données SMS
    const { From: fromNumber, Body: messageBody, To: toNumber } = req.body;
    
    console.log(`📱 SMS reçu de ${fromNumber}: "${messageBody}"`);

    // Générer réponse Babine
    const babineResponse = await generateSMSResponse(messageBody, fromNumber);
    
    // Envoyer réponse SMS
    await sendSMSResponse(fromNumber, babineResponse);
    
    console.log(`🤖 Babine répond par SMS: "${babineResponse}"`);

    // Réponse TwiML vide (pas de réponse automatique supplémentaire)
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(`
      <?xml version="1.0" encoding="UTF-8"?>
      <Response></Response>
    `);

  } catch (error) {
    console.error('❌ Erreur webhook Twilio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Intelligence Babine pour SMS (plus courte que Messenger)
async function generateSMSResponse(message, fromNumber) {
  const lowerMessage = message.toLowerCase();

  // Salutations
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('allo') || 
      lowerMessage.includes('salut')) {
    return "Allo! C'est Babine d'Esthetica Spa 🌸 Comment je peux t'aider?";
  }

  // Rendez-vous
  if (lowerMessage.includes('rendez-vous') || lowerMessage.includes('rdv')) {
    return "Super! Quel service et quand? Tu peux aussi réserver directement: https://babine.estheticaspa.com";
  }

  // Services populaires
  if (lowerMessage.includes('lipocavitation')) {
    if (lowerMessage.includes('prix')) {
      return "Lipocavitation: 120$ pour 90 min. Soin ultrasons pour sculpter le corps. Réserve: 581-813-1123";
    }
    return "Lipocavitation = soin ultrasons pour sculpter le corps. 6-10 séances recommandées. Prix?";
  }

  if (lowerMessage.includes('ipl') || lowerMessage.includes('épilation')) {
    if (lowerMessage.includes('prix')) {
      return "IPL épilation: 65-585$ selon zone. Ex: aisselles 75$ (15min). Réserve: 581-813-1123";
    }
    return "IPL = épilation définitive à la lumière pulsée. Moins mal que la cire! Quelle zone?";
  }

  // Prix généraux
  if (lowerMessage.includes('prix') || lowerMessage.includes('combien')) {
    return "Nos prix: Soins visage 160-200$, IPL épilation 65-585$, Soins corps 40-120$. Quel service t'intéresse?";
  }

  // Infos pratiques
  if (lowerMessage.includes('adresse') || lowerMessage.includes('où')) {
    return "📍 200, 33e Rue, Notre-Dame-des-Pins, G0M 1K0\n📞 581-813-1123\nLun-Ven 9h-18h, Sam 9h-16h";
  }

  // Réservation urgente
  if (lowerMessage.includes('urgent') || lowerMessage.includes('aujourd\'hui')) {
    return "Pour une réservation urgente, appelle directement Jessica au 581-813-1123! Je peux t'aider avec les infos services.";
  }

  // Réponse par défaut courte pour SMS
  return "Babine d'Esthetica Spa ici! 🤍 Dis-moi ce que tu cherches: prix, services, RDV? Ou appelle: 581-813-1123";
}

// Envoyer SMS via Twilio
async function sendSMSResponse(toNumber, message) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // +15817044600
      to: toNumber
    });

    console.log(`✅ SMS envoyé (SID: ${sms.sid})`);
    return sms;

  } catch (error) {
    console.error('❌ Erreur envoi SMS:', error);
    throw error;
  }
}

// API pour envoyer SMS programmés (confirmations, rappels)
export async function sendScheduledSMS(toNumber, message, type = 'general') {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: toNumber
    });

    console.log(`✅ SMS ${type} envoyé à ${toNumber} (SID: ${sms.sid})`);
    return { success: true, sid: sms.sid };

  } catch (error) {
    console.error(`❌ Erreur SMS ${type}:`, error);
    return { success: false, error: error.message };
  }
}