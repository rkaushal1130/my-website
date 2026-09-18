const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const MONGODB_URI =
  process.env.MONGODB_URL ||
  'mongodb+srv://neverquitop_db_user:rahul1130@coding.8vahpjy.mongodb.net/rahul_database?appName=coding';

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
  const emailUser = process.env.EMAIL_USER || process.env.TITAN_EMAIL_USER || 'admin@avauraai.com';
  const emailPass = process.env.EMAIL_PASSWORD || process.env.TITAN_EMAIL_PASSWORD;
  const emailHost = process.env.EMAIL_HOST || 'smtp.titan.email';
  const emailPort = Number(process.env.EMAIL_PORT) || 465;

  const recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || emailUser || 'admin@avauraai.com';
  const ccEmail = process.env.CC_EMAIL || (emailUser !== 'kaushalrahul1130@gmail.com' ? 'kaushalrahul1130@gmail.com' : undefined);

  const formattedDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  const subject = `New Contact Form Submission - ${docData.name}`;

  if (!emailPass) {
    console.error('❌ [Titan SMTP] EMAIL_PASSWORD environment variable is not configured. Email notification skipped. Please configure EMAIL_PASSWORD in Vercel environment variables.');
    return { success: false, error: 'EMAIL_PASSWORD not configured' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailPort === 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border: 1px solid #e1e4e8;">
          <tr>
            <td style="background-color: #0b0b0e; padding: 24px 30px; border-bottom: 3px solid #FF1F26;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">
                <span style="color: #FF1F26;">Avaura</span> Contact Inquiry
              </h1>
              <p style="margin: 6px 0 0 0; color: #a1a1aa; font-size: 13px;">
                A new inquiry has been submitted from your website.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 18px 0; color: #111827; font-size: 17px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
                Client Information
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; width: 140px; color: #6b7280; font-weight: 600;">Name:</td>
                  <td style="padding: 6px 0; color: #111827; font-weight: 600;">${docData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 600;">Email:</td>
                  <td style="padding: 6px 0;">
                    <a href="mailto:${docData.email}" style="color: #FF1F26; text-decoration: none; font-weight: 600;">${docData.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 600;">Phone:</td>
                  <td style="padding: 6px 0; color: #111827;">${docData.phone || '<span style="color: #9ca3af; font-style: italic;">Not provided</span>'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 600;">Company:</td>
                  <td style="padding: 6px 0; color: #111827;">${docData.company || '<span style="color: #9ca3af; font-style: italic;">Not provided</span>'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 600;">Service / Subject:</td>
                  <td style="padding: 6px 0; color: #111827;">
                    <span style="background-color: #f3f4f6; color: #1f2937; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 500; border: 1px solid #e5e7eb;">
                      ${docData.service}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; font-weight: 600;">Submission Date:</td>
                  <td style="padding: 6px 0; color: #4b5563; font-size: 13px;">${formattedDate}</td>
                </tr>
              </table>

              <div style="margin-top: 20px;">
                <h3 style="margin: 0 0 8px 0; color: #111827; font-size: 15px; font-weight: 600;">
                  Message:
                </h3>
                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-left: 4px solid #FF1F26; border-radius: 4px; padding: 16px; color: #1f2937; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${docData.message}</div>
              </div>

              <div style="margin-top: 28px; text-align: center;">
                <a href="mailto:${docData.email}?subject=Re: Your Inquiry on Avaura" style="display: inline-block; background-color: #FF1F26; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                  Reply to ${docData.name}
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fafafa; padding: 14px 30px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
              Delivered via Titan Business Email to <strong>${recipientEmail}</strong>. Clicking Reply will reply directly to <strong>${docData.email}</strong>.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"Avaura AI" <${emailUser}>`,
      to: recipientEmail,
      cc: ccEmail,
      replyTo: docData.email, // Visitor's email so replying sends directly to visitor
      subject,
      html: htmlContent,
      text: `New Contact Form Submission - ${docData.name}\n\nEmail: ${docData.email}\nPhone: ${docData.phone || 'Not provided'}\nCompany: ${docData.company || 'Not provided'}\nService: ${docData.service}\nSubmitted At: ${formattedDate}\n\nMessage:\n${docData.message}\n\nReply directly to: ${docData.email}`,
    });

    console.log('✅ Titan email notification delivered successfully to:', recipientEmail);
    return { success: true, method: 'titan-smtp' };
  } catch (smtpErr) {
    console.error('❌ Titan SMTP dispatch error:', smtpErr.message);
    return { success: false, error: smtpErr.message };
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

    // 1. Save to MongoDB Atlas with duplicate prevention
    let submissionId = 'ack-' + Date.now();
    try {
      await connectToMongo();

      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      const duplicate = await ContactSubmission.findOne({
        email: docData.email,
        message: docData.message,
        createdAt: { $gte: oneMinuteAgo },
      });

      if (duplicate) {
        console.log('Duplicate contact submission prevented in MongoDB Atlas for', docData.email);
        return res.status(200).json({
          success: true,
          data: { id: duplicate._id },
          message: 'Your message has already been received.',
        });
      }

      const submission = await ContactSubmission.create(docData);
      submissionId = submission._id;
      console.log('✅ Contact form saved to MongoDB Atlas [website]:', submission._id);
    } catch (dbErr) {
      console.error('MongoDB Atlas save error:', dbErr.message);
      console.log('📬 Saved inquiry via fallback:', JSON.stringify(docData));
    }

    // 2. Await Titan email notification dispatch
    try {
      await sendEmailNotification(docData);
    } catch (emailErr) {
      console.error('Email dispatch failed:', emailErr.message);
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
