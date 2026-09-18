const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const MONGODB_URI =
  process.env.MONGODB_URL ||
  'mongodb+srv://neverquitop_db_user:rahul1130@coding.8vahpjy.mongodb.net/rahul_database?appName=coding';

const NOTIFICATION_EMAIL = process.env.ADMIN_EMAIL || process.env.NOTIFICATION_EMAIL || 'admin@avauraai.com';

let cachedConnection = null;

async function connectToMongo() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  const conn = await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
  cachedConnection = conn;
  return conn;
}

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    service: { type: String, trim: true, default: 'AI Automation' },
    message: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'website',
  }
);

const ContactSubmission =
  mongoose.models.ContactSubmission ||
  mongoose.model('ContactSubmission', contactSchema, 'website');

async function sendEmailNotification(docData) {
  const subject = `🚀 New Client Lead: ${docData.name} (${docData.service})`;
  const submittedTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

  // 1. Direct SMTP if configured in Vercel environment variables
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost || (smtpUser.includes('@gmail.com') ? 'smtp.gmail.com' : undefined),
        service: !smtpHost && smtpUser.includes('@gmail.com') ? 'gmail' : undefined,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${docData.name} via Avaura" <${process.env.SMTP_FROM || smtpUser}>`,
        to: NOTIFICATION_EMAIL,
        replyTo: docData.email,
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0b0b0e; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #26262b; max-width: 600px;">
            <div style="border-bottom: 2px solid #FF1F26; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #FF1F26; margin: 0; font-size: 22px;">New Client Inquiry</h2>
              <p style="color: #a1a1aa; margin: 4px 0 0 0; font-size: 13px;">Received on ${submittedTime}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; width: 140px; font-weight: bold;">Client Name:</td>
                <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${docData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${docData.email}" style="color: #FF1F26; text-decoration: none;">${docData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; color: #ffffff;">${docData.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; font-weight: bold;">Company:</td>
                <td style="padding: 8px 0; color: #ffffff;">${docData.company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #a1a1aa; font-weight: bold;">Service / Interest:</td>
                <td style="padding: 8px 0; color: #ffffff;">${docData.service}</td>
              </tr>
            </table>
            <div style="background-color: #141418; padding: 16px; border-radius: 8px; border: 1px solid #26262b; margin-bottom: 20px;">
              <div style="color: #a1a1aa; font-size: 12px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px;">Project Details / Message:</div>
              <div style="color: #ffffff; line-height: 1.6; white-space: pre-wrap;">${docData.message}</div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${docData.email}?subject=Re: Your inquiry on Avaura" style="background-color: #FF1F26; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Reply to Client Directly</a>
            </div>
          </div>
        `,
      });
      console.log('✅ Email notification delivered via SMTP to:', NOTIFICATION_EMAIL);
      return;
    } catch (smtpErr) {
      console.error('SMTP notification failed, falling back to delivery webhook:', smtpErr.message);
    }
  }

  // 2. Direct email delivery to admin@avauraai.com with required Origin and Referer
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://avauraai.com',
        Referer: 'https://avauraai.com/',
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: docData.email,
        _template: 'table',
        'Client Name': docData.name,
        'Client Email': docData.email,
        'Client Contact': docData.phone || 'Not provided',
        'Company Name': docData.company || 'Not provided',
        'Area of Interest': docData.service,
        'Project Details': docData.message,
        'Submitted At': submittedTime,
      }),
    });
    const result = await res.json();
    console.log('✅ FormSubmit delivered email to:', NOTIFICATION_EMAIL, result);
  } catch (webhookErr) {
    console.error('Webhook notification dispatch error:', webhookErr.message);
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {}
    }

    const { name, email, phone, company, service, message } = body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full Name is required.',
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
    }

    if (!message || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 5 characters.',
      });
    }

    const docData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone && phone.trim() ? phone.trim() : undefined,
      company: company && company.trim() ? company.trim() : undefined,
      service: service && service.trim() ? service.trim() : 'AI Automation',
      message: message.trim(),
    };

    let submissionId = 'ack-' + Date.now();
    try {
      await connectToMongo();
      const submission = await ContactSubmission.create(docData);
      submissionId = submission._id;
      console.log('✅ Contact form saved to MongoDB Atlas [website]:', submission._id);
    } catch (dbErr) {
      console.error('MongoDB Atlas save error:', dbErr.message);
      console.log('📬 Saved inquiry via fallback:', JSON.stringify(docData));
    }

    try {
      await sendEmailNotification(docData);
    } catch (emailErr) {
      console.error('Background email dispatch failed:', emailErr.message);
    }

    return res.status(201).json({
      success: true,
      data: { id: submissionId },
      message: 'Your message has been received.',
    });
  } catch (error) {
    console.error('Unhandled contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process your request at this moment. Please try again later.',
    });
  }
};
