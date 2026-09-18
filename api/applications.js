const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const MONGODB_URI =
  process.env.MONGODB_URL ||
  'mongodb+srv://neverquitop_db_user:rahul1130@coding.8vahpjy.mongodb.net/rahul_database?appName=coding';

const NOTIFICATION_EMAIL = process.env.ADMIN_EMAIL || process.env.NOTIFICATION_EMAIL || 'admin@avauraai.com';
const CC_EMAIL = process.env.CC_EMAIL || 'kaushalrahul1130@gmail.com';

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

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    role: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    portfolio: { type: String, trim: true },
    resume: { type: String, trim: true },
    introduction: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'website',
  }
);

const CareerSubmission =
  mongoose.models.CareerSubmission ||
  mongoose.model('CareerSubmission', applicationSchema, 'website');

async function sendCareerNotification(docData) {
  const emailUser = process.env.EMAIL_USER || process.env.TITAN_EMAIL_USER || 'admin@avauraai.com';
  const emailPass = process.env.EMAIL_PASSWORD || process.env.TITAN_EMAIL_PASSWORD || process.env.SMTP_PASS;
  const emailHost = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.titan.email';
  const emailPort = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT) || 465;

  const subject = `💼 New Job Application: ${docData.name} for ${docData.role}`;
  const submittedTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

  if (!emailPass) {
    console.error('❌ [Titan SMTP] EMAIL_PASSWORD environment variable is not configured. Skipping career notification email.');
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

    await transporter.sendMail({
      from: `"Avaura Careers" <${emailUser}>`,
      to: NOTIFICATION_EMAIL,
      cc: CC_EMAIL,
      replyTo: docData.email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0b0e; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #26262b; max-width: 600px;">
          <div style="border-bottom: 2px solid #FF1F26; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #FF1F26; margin: 0; font-size: 22px;">New Job Application</h2>
            <p style="color: #a1a1aa; margin: 4px 0 0 0; font-size: 13px;">Received on ${submittedTime}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; width: 140px; font-weight: bold;">Applicant:</td>
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
              <td style="padding: 8px 0; color: #a1a1aa; font-weight: bold;">Target Role:</td>
              <td style="padding: 8px 0; color: #ffffff;">${docData.role}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; font-weight: bold;">Experience:</td>
              <td style="padding: 8px 0; color: #ffffff;">${docData.experience}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; font-weight: bold;">Portfolio / Link:</td>
              <td style="padding: 8px 0;"><a href="${docData.portfolio}" style="color: #FF1F26;" target="_blank">${docData.portfolio || 'None'}</a></td>
            </tr>
          </table>
          <div style="background-color: #141418; padding: 16px; border-radius: 8px; border: 1px solid #26262b; margin-bottom: 20px;">
            <div style="color: #a1a1aa; font-size: 12px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px;">Cover Letter / Introduction:</div>
            <div style="color: #ffffff; line-height: 1.6; white-space: pre-wrap;">${docData.introduction}</div>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:${docData.email}?subject=Re: Your application for ${docData.role} at Avaura" style="background-color: #FF1F26; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Reply to Applicant</a>
          </div>
        </div>
      `,
    });
    console.log('✅ Titan email career notification delivered successfully to:', NOTIFICATION_EMAIL);
    return { success: true };
  } catch (err) {
    console.error('❌ Titan SMTP career notification failed:', err.message);
    return { success: false, error: err.message };
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

    const { name, email, phone, role, jobTitle, experience, portfolio, resume, introduction, coverLetter } = body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const docData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone && phone.trim() ? phone.trim() : undefined,
      role: (role || jobTitle || 'Technology & Engineering').trim(),
      experience: experience || '1-3 Years',
      portfolio: portfolio && portfolio.trim() ? portfolio.trim() : undefined,
      resume: resume && resume.trim() ? resume.trim() : undefined,
      introduction: (introduction || coverLetter || 'Applicant submitted form via website.').trim(),
    };

    let submissionId = 'ack-' + Date.now();
    try {
      await connectToMongo();
      const submission = await CareerSubmission.create(docData);
      submissionId = submission._id;
      console.log('✅ Career application saved to MongoDB Atlas:', submission._id);
    } catch (dbErr) {
      console.error('MongoDB Atlas save error:', dbErr.message);
      console.log('📬 Saved application fallback:', JSON.stringify(docData));
    }

    try {
      await sendCareerNotification(docData);
    } catch (emailErr) {
      console.error('Background career email dispatch failed:', emailErr.message);
    }

    return res.status(201).json({
      success: true,
      data: { id: submissionId },
      message: 'Your application has been received.',
    });
  } catch (error) {
    console.error('Unhandled career application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process your application at this moment. Please try again later.',
    });
  }
};
