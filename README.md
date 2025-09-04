# Babine – Esthetica Spa (Vercel / Next.js)

Projet prêt à déployer sur Vercel. API routes et webhooks déjà branchés.

## Endpoints (public)
- **Messenger**: `/webhook/messenger` → réécrit vers `/api/webhook-messenger`
- **Twilio**: `/webhook/twilio` → réécrit vers `/api/webhook-twilio`
- **Calendar**: `/calendar/sync` → réécrit vers `/api/calendar-sync`

## Déploiement rapide
1) **GitHub**: créer un repo et pousser ce dossier.
2) **Vercel**: Importer depuis GitHub → Build Next.js par défaut.
3) **Env Vars (Vercel → Project → Settings → Environment Variables)** : copier le contenu de `.env.local` (ci-dessous) **sans** les guillemets.

## Webhooks à configurer
- **Facebook Messenger**: Définir l’URL de vérification et de messages sur :  
  `https://<ton-domaine>.vercel.app/webhook/messenger`  
  Verify Token = `babine_esthetica_verify_2025`
- **Twilio SMS** (Number → A Messaging webhook):  
  `https://<ton-domaine>.vercel.app/webhook/twilio` (HTTP POST, x-www-form-urlencoded)

## Notes
- Google Calendar utilise un **service account**. Partager les agendas
  (Jessica & Obeylia) avec l’email du service account OU activer delegation.
- Les routes API ne sont **pas modifiées**. Le code backend fourni est repris tel quel.
- Les rewrites assurent que tes URLs publiques correspondent à celles que tu utilises.

---

## Variables d’environnement
Voir `.env.local` inclus et adapte si besoin.
