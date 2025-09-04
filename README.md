# Babine – Esthetica Spa (Vercel / Next.js)

Projet prêt à déployer sur Vercel. API routes et webhooks déjà branchés.

## ✅ État du Projet

- ✅ **Build**: Le projet compile sans erreurs
- ✅ **Interface**: Application spa complète avec calendrier
- ✅ **APIs**: Tous les endpoints webhooks fonctionnels
- ✅ **Rewrites**: URLs publiques configurées pour Vercel
- ✅ **Configuration**: Prêt pour le déploiement

## 🚀 Déploiement sur Vercel

### 1. Prérequis
- Compte Vercel (gratuit)
- Repository GitHub avec ce code
- Variables d'environnement configurées

### 2. Déploiement automatique
1. Connecter votre repository GitHub à Vercel
2. Importer le projet (Vercel détecte automatiquement Next.js)
3. Configurer les variables d'environnement (voir section ci-dessous)
4. Déployer

### 3. Variables d'environnement requises
Aller dans **Vercel Dashboard → Project → Settings → Environment Variables**

Copier les variables depuis `.env.local.example` (SANS les guillemets):

```bash
# Facebook Messenger
MESSENGER_VERIFY_TOKEN=babine_esthetica_verify_2025
FACEBOOK_PAGE_ACCESS_TOKEN=your_facebook_token_here

# Twilio SMS  
TWILIO_ACCOUNT_SID=your_twilio_sid_here
TWILIO_AUTH_TOKEN=your_twilio_token_here
TWILIO_PHONE_NUMBER=+1234567890

# Google Calendar (JSON en une ligne)
GOOGLE_CALENDAR_CREDENTIALS={"type":"service_account",...}
```

## 🔗 Endpoints (URLs publiques)

Une fois déployé sur `https://votre-app.vercel.app`:

- **Facebook Messenger**: `https://votre-app.vercel.app/webhook/messenger`
- **Twilio SMS**: `https://votre-app.vercel.app/webhook/twilio` 
- **Google Calendar**: `https://votre-app.vercel.app/calendar/sync`

## ⚙️ Configuration des Services

### Facebook Messenger
1. Facebook Developer Console → App → Messenger → Webhooks
2. URL: `https://votre-app.vercel.app/webhook/messenger`
3. Verify Token: `babine_esthetica_verify_2025`
4. Subscribe to: `messages`, `messaging_postbacks`

### Twilio SMS
1. Twilio Console → Phone Numbers → Manage → Active numbers
2. Webhook URL: `https://votre-app.vercel.app/webhook/twilio`
3. HTTP Method: POST
4. Content Type: `application/x-www-form-urlencoded`

### Google Calendar
1. Google Cloud Console → Create Service Account
2. Download JSON credentials
3. Share calendars Jessica & Obeylia with service account email
4. Add JSON (as single line) to `GOOGLE_CALENDAR_CREDENTIALS`

## 🧪 Test Local

```bash
# Installer dépendances
npm install

# Démarrer en développement
npm run dev

# Tester build production
npm run build
npm run start
```

### Test des webhooks localement:
```bash
# Messenger (avec token correct)
curl "http://localhost:3000/webhook/messenger?hub.mode=subscribe&hub.verify_token=babine_esthetica_verify_2025&hub.challenge=test123"

# Twilio (method not allowed pour GET = normal)
curl "http://localhost:3000/webhook/twilio"

# Calendar (erreur credentials = normal sans env vars)
curl "http://localhost:3000/calendar/sync"
```

## 📁 Structure du Projet

```
pages/
├── api/
│   ├── webhook-messenger.js    # Facebook Messenger webhook
│   ├── webhook-twilio.js       # Twilio SMS webhook  
│   └── calendar-sync.js        # Google Calendar API
├── index.tsx                   # Page principale (calendrier)
└── _app.tsx                    # Configuration Next.js

components/
├── EstheticaApp.tsx           # Application principale
├── BabineCustomizationSystem.tsx
└── CalendarImportSystem.tsx

vercel.json                    # Configuration rewrites Vercel
next.config.mjs               # Configuration Next.js (rewrites dev)
.env.local.example           # Template variables d'environnement
```

## 🛠️ Fonctionnalités

- **Calendrier interactif** - Gestion rendez-vous Jessica & Obeylia
- **Messenger Bot** - Réponses automatiques intelligentes
- **SMS Bot** - Réponses Twilio automatiques
- **Sync Google Calendar** - Création/modification événements
- **Interface responsive** - Desktop et mobile
- **Customisation avancée** - Thèmes et configuration

## 📞 Support

Application prête pour production. En cas de problème:
1. Vérifier les variables d'environnement
2. Consulter les logs Vercel
3. Tester les endpoints individuellement