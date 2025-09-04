// pages/api/webhook-messenger.js
// Webhook pour Facebook Messenger - Babine répond automatiquement

export default async function handler(req, res) {
  const { method, query, body } = req;

  // Vérification du webhook (GET)
  if (method === 'GET') {
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.MESSENGER_VERIFY_TOKEN) {
      console.log('✅ Webhook Messenger vérifié!');
      return res.status(200).send(challenge);
    }
    
    return res.status(403).send('Forbidden');
  }

  // Traitement des messages (POST)
  if (method === 'POST') {
    if (body.object === 'page') {
      // Traiter chaque entrée
      body.entry?.forEach(entry => {
        const webhookEvent = entry.messaging?.[0];
        if (webhookEvent?.message) {
          handleMessage(webhookEvent);
        }
      });
    }
    
    return res.status(200).send('EVENT_RECEIVED');
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

// Traitement intelligent des messages
async function handleMessage(event) {
  const senderId = event.sender.id;
  const messageText = event.message.text;
  const timestamp = event.timestamp;

  console.log(`📬 Message reçu de ${senderId}: "${messageText}"`);

  try {
    // Babine génère la réponse
    const response = await generateBabineResponse(messageText);
    
    // Envoyer via Messenger API
    await sendMessengerMessage(senderId, response);
    
    console.log(`🤖 Babine répond: "${response}"`);
  } catch (error) {
    console.error('❌ Erreur traitement message:', error);
    
    // Réponse d'erreur backup
    await sendMessengerMessage(senderId, "Désolé, j'ai un petit problème technique. Écris-nous directement au 581-813-1123! 😊");
  }
}

// Intelligence Babine - Exactement comme dans l'app
async function generateBabineResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Salutations
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('allo') || 
      lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
    return "Allo! 🌸 C'est Babine d'Esthetica Spa! Comment je peux t'aider aujourd'hui?";
  }

  // Demande de rendez-vous
  if (lowerMessage.includes('rendez-vous') || lowerMessage.includes('rdv') || 
      lowerMessage.includes('réserver') || lowerMessage.includes('appointment')) {
    return "Super! 😊 Quel service tu veux et à quel moment tu serais dispo?";
  }

  // Lipocavitation (sans prix)
  if (lowerMessage.includes('lipocavitation') && !lowerMessage.includes('prix') && 
      !lowerMessage.includes('combien') && !lowerMessage.includes('coût')) {
    return "La lipocavitation, c'est un soin non-invasif avec ultrasons. Ça aide à détruire les cellules graisseuses et sculpter le corps. En général, on recommande entre 6 à 10 séances pour de bons résultats.";
  }

  // IPL sans prix
  if ((lowerMessage.includes('ipl') || lowerMessage.includes('épilation')) && 
      !lowerMessage.includes('prix') && !lowerMessage.includes('combien')) {
    
    if (lowerMessage.includes('aisselles')) {
      return "L'IPL aux aisselles, c'est rapide et efficace. 15 minutes pis c'est fini! Tu veux savoir autre chose?";
    }
    
    return "L'IPL c'est une épilation définitive avec de la lumière pulsée. C'est moins douloureux que la cire et super efficace sur le long terme.";
  }

  // Questions sur douleur
  if (lowerMessage.includes('mal') || lowerMessage.includes('douleur')) {
    return "C'est très tolérable, moins pire que la cire. Certaines zones sont plus sensibles mais en général ça se fait très bien 😉";
  }

  // Soins visage
  if (lowerMessage.includes('soins visage') && !lowerMessage.includes('prix')) {
    return "J'ai 2 types : technologie (IPL/Oxygénéo) pour acné, couperose, taches, photorajeunissement. Ou manuel (Ella Baché) : Green Filler, Hydra Repulpant, Morphostructure. Lequel t'intéresse?";
  }

  // PRIX - seulement si demandé explicitement
  if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('combien')) {
    if (lowerMessage.includes('lipocavitation')) {
      return "La lipocavitation c'est 120$ pour 90 minutes.";
    }
    if (lowerMessage.includes('aisselles')) {
      return "Aisselles IPL c'est 75$ pour 15 minutes.";
    }
    if (lowerMessage.includes('lifting colombien')) {
      return "Le lifting colombien c'est 100$ pour 60 minutes.";
    }
    if (lowerMessage.includes('soins visage')) {
      return "Soins technologie (IPL/Oxygénéo) c'est 200$, soins manuels (Ella Baché) c'est 160$.";
    }
    return "Dis-moi quel service t'intéresse et je te donne le prix exact!";
  }

  // Processus de réservation - Jours
  if (lowerMessage.includes('mercredi') || lowerMessage.includes('jeudi') || lowerMessage.includes('vendredi')) {
    const day = lowerMessage.includes('mercredi') ? 'mercredi' : 
                lowerMessage.includes('jeudi') ? 'jeudi' : 'vendredi';
    return `Parfait! ${day.charAt(0).toUpperCase() + day.slice(1)} ça marche. Dis-moi l'heure qui te va le mieux.`;
  }

  // Processus de réservation - Heures
  if (lowerMessage.includes('19h') || lowerMessage.includes('18h') || lowerMessage.includes('17h')) {
    const time = lowerMessage.match(/\d{1,2}h/)?.[0] || 'l\'heure demandée';
    return `Super! Pour finaliser ton RDV pour ${time}, donne-moi ton nom complet et ton numéro de téléphone.`;
  }

  // Infos pratiques
  if (lowerMessage.includes('adresse') || lowerMessage.includes('où') || lowerMessage.includes('address')) {
    return "📍 200, 33e Rue, Notre-Dame-des-Pins, G0M 1K0\n📞 581-813-1123\n\nOn est facilement accessible!";
  }

  // Heures d'ouverture
  if (lowerMessage.includes('heure') && (lowerMessage.includes('ouvert') || lowerMessage.includes('ferme'))) {
    return "Nos heures: Lun-Ven 9h-18h, Sam 9h-16h. Pour un RDV en soirée, demande-moi et on voit ce qu'on peut faire! 😊";
  }

  // Réponse par défaut
  return "Comment je peux t'aider? Tu peux me demander les prix, prendre un rendez-vous, ou poser des questions sur nos services! 🤍";
}

// Envoyer message via Facebook Messenger API
async function sendMessengerMessage(recipientId, messageText) {
  const messageData = {
    recipient: { id: recipientId },
    message: { text: messageText },
    messaging_type: "RESPONSE"
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${process.env.MESSENGER_PAGE_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Babine-Esthetica-Bot/1.0'
      },
      body: JSON.stringify(messageData)
    });

    if (response.ok) {
      console.log('✅ Message Messenger envoyé avec succès');
      return await response.json();
    } else {
      const error = await response.text();
      console.error('❌ Erreur envoi Messenger:', error);
      throw new Error(`Erreur ${response.status}: ${error}`);
    }

  } catch (error) {
    console.error('❌ Erreur Facebook Messenger API:', error);
    throw error;
  }
}