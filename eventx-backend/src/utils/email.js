import nodemailer from 'nodemailer';

let transporter = null;

export const getTransporter = async () => {
  if (transporter) return transporter;
  if (process.env.SMTP_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    // Fallback to a JSON transport (logs emails to console)
    transporter = nodemailer.createTransport({ jsonTransport: true });
  }
  return transporter;
};

export const sendMail = async ({ to, subject, html }) => {
  const t = await getTransporter();
  const info = await t.sendMail({
    from: process.env.FROM_EMAIL || 'EventX <no-reply@eventx.local>',
    to, subject, html
  });
  if (process.env.SMTP_HOST) {
    console.log('Email sent:', info.messageId);
  } else {
    console.log('Email (logged):', info.message);
  }
};
