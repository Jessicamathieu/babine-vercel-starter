import React from 'react';

let AppComp: React.ComponentType | null = null;
try { AppComp = require('../components/EstheticaApp').default || null; } catch (e) {}

export default function Home() {
  if (AppComp) {
    const Comp: any = AppComp;
    return <Comp />;
  }
  return (
    <main style={{padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial'}}>
      <h1>Babine – Esthetica Spa</h1>
      <p>Frontend minimal prêt. Les webhooks sont dans <code>/pages/api</code>.</p>
      <ul>
        <li>Messenger: <code>/api/webhook-messenger</code> (réécrit depuis <code>/webhook/messenger</code>)</li>
        <li>Twilio: <code>/api/webhook-twilio</code> (réécrit depuis <code>/webhook/twilio</code>)</li>
        <li>Calendar: <code>/api/calendar-sync</code> (réécrit depuis <code>/calendar/sync</code>)</li>
      </ul>
    </main>
  );
}
