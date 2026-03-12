const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ══════════════════════════════════════
//  CONFIGURAÇÕES — edite aqui
// ══════════════════════════════════════
const CONFIG = {
  // Link do seu produto entregável
  PRODUCT_URL: 'https://divinecrosscodes.lovable.app/',

  // Hotmart: token do webhook (você define lá no painel)
  HOTMART_TOKEN: process.env.HOTMART_TOKEN || 'SEU_TOKEN_HOTMART',

  // PerfectPay: token do webhook
  PERFECTPAY_TOKEN: process.env.PERFECTPAY_TOKEN || 'SEU_TOKEN_PERFECTPAY',

  // E-mail remetente (Gmail recomendado)
  EMAIL_FROM_NAME:    process.env.EMAIL_FROM_NAME    || 'Divine Cross Codes',
  EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS || 'seuemail@gmail.com',
  EMAIL_PASSWORD:     process.env.EMAIL_PASSWORD     || 'SUA_SENHA_APP_GMAIL',
};
// ══════════════════════════════════════

// Transporter de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: CONFIG.EMAIL_FROM_ADDRESS,
    pass: CONFIG.EMAIL_PASSWORD,
  },
});

// ── Template do e-mail ──────────────────
function buildEmail(customerName, productUrl) {
  const firstName = (customerName || 'Beloved Soul').split(' ')[0];
  return {
    subject: '✦ Your Divine Cross Codes Access Is Ready',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Divine Cross Codes — Access</title>
</head>
<body style="margin:0;padding:0;background:#07050200;font-family:Georgia,serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#07050200;padding:40px 0">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0F0B04;border:1px solid rgba(201,168,76,.25)">

      <!-- Header gold bar -->
      <tr><td style="height:3px;background:linear-gradient(to right,transparent,#C9A84C,transparent)"></td></tr>

      <!-- Logo / Symbol -->
      <tr><td align="center" style="padding:48px 40px 24px">
        <div style="width:70px;height:70px;border:1px solid rgba(201,168,76,.3);border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="5" width="6" height="40" rx="1" fill="url(#ev)"/>
            <rect x="5" y="22" width="40" height="6" rx="1" fill="url(#eh)"/>
            <rect x="22" y="22" width="6" height="6" fill="#C9A84C" transform="rotate(45 25 25)" opacity=".9"/>
            <defs>
              <linearGradient id="ev" x1="25" y1="5" x2="25" y2="45" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#F5E6B8" stop-opacity=".2"/>
                <stop offset="50%" stop-color="#C9A84C"/>
                <stop offset="100%" stop-color="#F5E6B8" stop-opacity=".2"/>
              </linearGradient>
              <linearGradient id="eh" x1="5" y1="25" x2="45" y2="25" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#F5E6B8" stop-opacity=".2"/>
                <stop offset="50%" stop-color="#C9A84C"/>
                <stop offset="100%" stop-color="#F5E6B8" stop-opacity=".2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#C9A84C">
          ✦ Sacred Access Ready ✦
        </p>
        <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:28px;font-weight:400;color:#F5E6B8;letter-spacing:1px;line-height:1.2">
          Welcome, ${firstName}.
        </h1>
        <p style="margin:0;font-family:Georgia,serif;font-size:16px;font-style:italic;font-weight:300;color:rgba(245,230,184,.6);letter-spacing:1px">
          Your transformation begins now.
        </p>
      </td></tr>

      <!-- Divider -->
      <tr><td style="padding:0 40px">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="height:1px;background:linear-gradient(to right,transparent,rgba(201,168,76,.4),transparent)"></td>
        </tr></table>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:36px 40px;color:rgba(250,246,238,.72);font-family:Georgia,serif;font-size:15px;font-weight:300;line-height:1.9">
        <p style="margin:0 0 20px">
          Thank you for taking this sacred step. You have been guided here — and everything you need to unlock divine alignment, healing, and abundance is now waiting for you inside your portal.
        </p>
        <p style="margin:0 0 20px">
          Your access includes:
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
          ${[
            ['✦','The 7 Sacred Divine Cross Codes'],
            ['✦','Daily sacred assignments & challenges'],
            ['✦','Divine Prayer library — 6 complete prayers'],
            ['✦','Activation Rituals (5, 15 & 30 min)'],
            ['✦','7-Day Transformation Cycle'],
            ['✦','Emergency Prayer — divine help anytime'],
          ].map(([icon, text]) => `
          <tr>
            <td width="24" style="padding:5px 0;vertical-align:top;color:#C9A84C;font-size:13px">${icon}</td>
            <td style="padding:5px 0;color:rgba(250,246,238,.75);font-size:14px;font-family:Georgia,serif">${text}</td>
          </tr>`).join('')}
        </table>
      </td></tr>

      <!-- CTA Button -->
      <tr><td align="center" style="padding:0 40px 40px">
        <table cellpadding="0" cellspacing="0">
          <tr><td style="background:linear-gradient(135deg,#F5E6B8,#C9A84C,#E8C97A);clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)">
            <a href="${productUrl}" target="_blank"
               style="display:block;padding:18px 52px;font-family:Georgia,serif;font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#07050200;text-decoration:none;font-weight:600">
              Enter Your Sacred Portal
            </a>
          </td></tr>
        </table>
        <p style="margin:16px 0 0;font-family:Georgia,serif;font-size:12px;color:rgba(201,168,76,.4);letter-spacing:2px">
          Or copy: <span style="color:rgba(201,168,76,.6)">${productUrl}</span>
        </p>
      </td></tr>

      <!-- Quote -->
      <tr><td style="padding:0 40px 36px;border-top:1px solid rgba(201,168,76,.1)">
        <p style="margin:28px 0 0;font-family:Georgia,serif;font-size:17px;font-style:italic;font-weight:300;color:#F5E6B8;text-align:center;line-height:1.7">
          "You were not born to struggle. You were born encoded<br>with divine instructions — the cross holds the key."
        </p>
        <p style="margin:12px 0 0;text-align:center;font-family:Georgia,serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:rgba(201,168,76,.45)">
          — Divine Cross Codes
        </p>
      </td></tr>

      <!-- Footer bar -->
      <tr><td style="height:3px;background:linear-gradient(to right,transparent,#C9A84C,transparent)"></td></tr>

      <!-- Footer text -->
      <tr><td align="center" style="padding:24px 40px">
        <p style="margin:0;font-family:Georgia,serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(201,168,76,.25)">
          Divine Cross Codes &nbsp;·&nbsp; Sacred · Aligned · Transformative
        </p>
        <p style="margin:8px 0 0;font-family:Georgia,serif;font-size:11px;color:rgba(250,246,238,.2)">
          You received this email because you purchased Divine Cross Codes.
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`,
    text: `Welcome to Divine Cross Codes, ${firstName}!\n\nYour sacred portal is ready. Access it here:\n${productUrl}\n\nDivine Cross Codes — Sacred · Aligned · Transformative`,
  };
}

// ── Send email helper ───────────────────
async function sendAccessEmail(customerEmail, customerName) {
  const email = buildEmail(customerName, CONFIG.PRODUCT_URL);
  await transporter.sendMail({
    from: `"${CONFIG.EMAIL_FROM_NAME}" <${CONFIG.EMAIL_FROM_ADDRESS}>`,
    to: customerEmail,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
  console.log(`[EMAIL SENT] → ${customerEmail} (${customerName})`);
}

// ══════════════════════════════════════
//  WEBHOOK — HOTMART
//  POST /webhook/hotmart
// ══════════════════════════════════════
app.post('/webhook/hotmart', async (req, res) => {
  try {
    // Valida token Hotmart via header
    const token = req.headers['x-hotmart-hottok'] || req.headers['hottok'];
    if (token !== CONFIG.HOTMART_TOKEN) {
      console.warn('[HOTMART] Token inválido:', token);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = req.body;
    const event = body.event || body.data?.event;

    console.log('[HOTMART] Event:', event);

    // Só processa compras aprovadas
    const validEvents = [
      'PURCHASE_APPROVED',
      'PURCHASE_COMPLETE',
      'PURCHASE_BILLET_PRINTED', // boleto gerado (opcional — remova se não quiser)
    ];

    if (!validEvents.includes(event)) {
      return res.status(200).json({ message: 'Event ignored', event });
    }

    // Extrai dados do comprador
    const buyer = body.data?.buyer || body.buyer || {};
    const customerEmail = buyer.email;
    const customerName  = buyer.name || 'Sacred Soul';

    if (!customerEmail) {
      console.warn('[HOTMART] E-mail não encontrado no payload');
      return res.status(400).json({ error: 'Email not found' });
    }

    await sendAccessEmail(customerEmail, customerName);
    return res.status(200).json({ success: true, email: customerEmail });

  } catch (err) {
    console.error('[HOTMART] Erro:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ══════════════════════════════════════
//  WEBHOOK — PERFECTPAY
//  POST /webhook/perfectpay
// ══════════════════════════════════════
app.post('/webhook/perfectpay', async (req, res) => {
  try {
    // Valida token PerfectPay via query param ou header
    const token = req.query.token || req.headers['x-perfectpay-token'];
    if (token !== CONFIG.PERFECTPAY_TOKEN) {
      console.warn('[PERFECTPAY] Token inválido:', token);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = req.body;
    const status = body.sale_status || body.status || '';

    console.log('[PERFECTPAY] Status:', status);

    // Só processa vendas aprovadas
    // PerfectPay status: 'approved', 'complete', 'paid'
    const validStatuses = ['approved', 'complete', 'paid', 'APPROVED', 'COMPLETE', 'PAID'];

    if (!validStatuses.includes(status)) {
      return res.status(200).json({ message: 'Status ignored', status });
    }

    // Extrai dados do comprador
    const customerEmail = body.customer?.email || body.buyer_email || body.email;
    const customerName  = body.customer?.name  || body.buyer_name  || body.name || 'Sacred Soul';

    if (!customerEmail) {
      console.warn('[PERFECTPAY] E-mail não encontrado no payload');
      return res.status(400).json({ error: 'Email not found' });
    }

    await sendAccessEmail(customerEmail, customerName);
    return res.status(200).json({ success: true, email: customerEmail });

  } catch (err) {
    console.error('[PERFECTPAY] Erro:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ── Health check ────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    product: 'Divine Cross Codes Webhook',
    endpoints: {
      hotmart:    'POST /webhook/hotmart',
      perfectpay: 'POST /webhook/perfectpay',
    },
  });
});

// ── Start ───────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✦ Divine Cross Codes Webhook rodando na porta ${PORT}`);
  console.log(`  POST /webhook/hotmart`);
  console.log(`  POST /webhook/perfectpay\n`);
});
