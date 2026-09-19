const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dns = require('dns');

// Configure reliable DNS servers for MongoDB Atlas SRV record resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {}

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

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    service: { type: String, trim: true, default: 'Digital Engineering' },
    initials: { type: String, trim: true },
    stars: { type: Number, required: true, default: 5, min: 1, max: 5 },
    quote: { type: String, required: true, trim: true },
    approved: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'feedbacks',
  }
);

const FeedbackSubmission =
  mongoose.models.FeedbackSubmission ||
  mongoose.model('FeedbackSubmission', feedbackSchema, 'feedbacks');

const generateInitials = (name) => {
  if (!name) return 'CL';
  const clean = name.trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
};

const sanitizeQuote = (str) => {
  if (!str) return '';
  return str.replace(/^["'“”«»]+|["'“”«»]+$/g, '').trim();
};

async function sendReviewNotification(docData) {
  const emailUser = process.env.EMAIL_USER || process.env.TITAN_EMAIL_USER || 'admin@avauraai.com';
  const emailPass = process.env.EMAIL_PASSWORD || process.env.TITAN_EMAIL_PASSWORD;
  const emailHost = process.env.EMAIL_HOST || 'smtp.titan.email';
  const emailPort = Number(process.env.EMAIL_PORT) || 465;

  const recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || emailUser || 'admin@avauraai.com';
  const ccEmail = process.env.CC_EMAIL || (emailUser !== 'kaushalrahul1130@gmail.com' ? 'kaushalrahul1130@gmail.com' : undefined);

  if (!emailPass) {
    console.log('ℹ️ EMAIL_PASSWORD not set. Skipping SMTP alert for review.');
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

    const starIcons = '★'.repeat(docData.stars || 5) + '☆'.repeat(Math.max(0, 5 - (docData.stars || 5)));
    const subject = `⭐ New Client Review (${docData.stars}★) from ${docData.name}`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0b0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #07070a; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0e0e14; border-radius: 12px; overflow: hidden; border: 1px solid #272730; box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
          <tr>
            <td style="background-color: #12121c; padding: 24px 30px; border-bottom: 2px solid #FF1F26;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">
                <span style="color: #FF1F26;">Avaura</span> Client Feedback Received
              </h1>
              <p style="margin: 6px 0 0 0; color: #a1a1aa; font-size: 13px;">
                A new client review has been published to your live portfolio.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <div style="background-color: #161622; border: 1px solid #2b2b38; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <div style="color: #FBBF24; font-size: 20px; margin-bottom: 8px; letter-spacing: 2px;">
                  ${starIcons} <span style="font-size: 14px; font-weight: 600; color: #FBBF24;">(${docData.stars}.0 / 5.0)</span>
                </div>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #f4f4f5; font-style: italic;">
                  "${docData.quote}"
                </p>
                <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #a1a1aa;">
                  <strong style="color: #ffffff;">${docData.name}</strong> • ${docData.service || 'Digital Engineering'}
                </div>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://avauraai.com/portfolio#clients-feedback" style="display: inline-block; background-color: #FF1F26; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                  View Live on Portfolio &rarr;
                </a>
              </div>
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
      subject,
      html: htmlContent,
      text: `New Client Review from ${docData.name} (${docData.stars}★)\nService: ${docData.service}\n\n"${docData.quote}"\n\nView live at: https://avauraai.com/portfolio#clients-feedback`,
    });

    console.log('✅ Review notification email dispatched successfully');
    return { success: true };
  } catch (err) {
    console.error('Email alert error:', err.message);
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

  // GET: Fetch all active reviews from MongoDB Atlas
  if (req.method === 'GET') {
    try {
      await connectToMongo();
      const docs = await FeedbackSubmission.find({ approved: { $ne: false } })
        .sort({ createdAt: -1 })
        .lean();

      const formatted = docs.map((doc) => ({
        id: doc._id.toString(),
        name: doc.name,
        service: doc.service || 'Digital Engineering',
        initials: doc.initials || generateInitials(doc.name),
        stars: Number(doc.stars) || 5,
        quote: sanitizeQuote(doc.quote),
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
      }));

      res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
      return res.status(200).json({
        success: true,
        data: formatted,
        count: formatted.length,
      });
    } catch (err) {
      console.error('GET /api/feedback error:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Unable to retrieve feedbacks right now.',
        error: err.message,
      });
    }
  }

  // POST: Submit a new client review
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {}
      }

      const { name, service, stars, quote } = body || {};

      if (!name || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Full Name is required.',
        });
      }

      const cleanQuoteText = sanitizeQuote(quote);
      if (!cleanQuoteText || cleanQuoteText.length < 10) {
        return res.status(400).json({
          success: false,
          message: 'Please provide feedback of at least 10 characters.',
        });
      }

      const parsedStars = Math.max(1, Math.min(5, Number(stars) || 5));
      const clientInitials = generateInitials(name);

      const docData = {
        name: name.trim(),
        service: service && service.trim() ? service.trim() : 'Digital Engineering',
        initials: clientInitials,
        stars: parsedStars,
        quote: cleanQuoteText,
        approved: true,
      };

      await connectToMongo();

      // Duplicate prevention: avoid spam duplicate submissions in quick succession
      const recentDuplicate = await FeedbackSubmission.findOne({
        name: docData.name,
        quote: docData.quote,
        createdAt: { $gte: new Date(Date.now() - 60 * 1000) },
      });

      if (recentDuplicate) {
        return res.status(200).json({
          success: true,
          data: {
            id: recentDuplicate._id.toString(),
            name: recentDuplicate.name,
            service: recentDuplicate.service,
            initials: recentDuplicate.initials,
            stars: recentDuplicate.stars,
            quote: recentDuplicate.quote,
            createdAt: recentDuplicate.createdAt,
          },
          message: 'Your review was already submitted and is live.',
        });
      }

      const saved = await FeedbackSubmission.create(docData);
      console.log('✅ Feedback created in MongoDB Atlas:', saved._id, 'by', docData.name);

      // Trigger email alert asynchronously
      sendReviewNotification(docData).catch((err) => {
        console.error('Email alert dispatch error:', err.message);
      });

      return res.status(201).json({
        success: true,
        data: {
          id: saved._id.toString(),
          name: saved.name,
          service: saved.service,
          initials: saved.initials,
          stars: saved.stars,
          quote: saved.quote,
          createdAt: saved.createdAt.toISOString(),
        },
        message: 'Thank you! Your review is now live on our portfolio.',
      });
    } catch (err) {
      console.error('POST /api/feedback error:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to submit review. Please try again.',
        error: err.message,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
};
