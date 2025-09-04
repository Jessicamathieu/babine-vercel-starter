import React from "react";

const PrivacyPolicy = () => (
  <div className="max-w-2xl mx-auto py-12 px-6">
    <h1 className="text-2xl font-bold mb-4">Politique de confidentialité</h1>
    <p className="mb-4">Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez l’application Esthetica Spa.</p>
    <h2 className="text-lg font-semibold mt-6 mb-2">Collecte des informations</h2>
    <p>Nous collectons uniquement les informations nécessaires à la gestion des rendez-vous et à la communication avec les clients (nom, téléphone, email, service choisi).</p>
    <h2 className="text-lg font-semibold mt-6 mb-2">Utilisation des données</h2>
    <p>Les données sont utilisées pour organiser les rendez-vous, envoyer des confirmations et permettre le fonctionnement des services Messenger et SMS.</p>
    <h2 className="text-lg font-semibold mt-6 mb-2">Partage des données</h2>
    <p>Vos informations ne sont jamais vendues ou partagées à des tiers, sauf pour l’intégration technique avec Google Calendar ou Twilio (SMS).</p>
    <h2 className="text-lg font-semibold mt-6 mb-2">Sécurité</h2>
    <p>Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre tout accès non autorisé.</p>
    <h2 className="text-lg font-semibold mt-6 mb-2">Contact</h2>
    <p>Pour toute question concernant la confidentialité, contactez-nous à <a href="mailto:info@estheticaspa.com" className="text-blue-600 underline">info@estheticaspa.com</a>.</p>
  </div>
);

export default PrivacyPolicy;
