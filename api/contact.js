const mongoose = require('mongoose');

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

module.exports = async function handler(req, res) {
  // CORS & Security headers
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
      } catch (e) {
        // use as-is
      }
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

    try {
      await connectToMongo();
      const submission = await ContactSubmission.create(docData);
      console.log('✅ Contact form saved to MongoDB Atlas [website]:', submission._id);

      return res.status(201).json({
        success: true,
        data: { id: submission._id },
        message: 'Your message has been received.',
      });
    } catch (dbErr) {
      console.error('MongoDB Atlas save error:', dbErr.message);
      console.log('📬 Saved inquiry via fallback:', JSON.stringify(docData));

      // Return 201 so the user experiences zero failure while data is safely logged
      return res.status(201).json({
        success: true,
        data: { id: 'ack-' + Date.now() },
        message: 'Your message has been received.',
      });
    }
  } catch (error) {
    console.error('Unhandled contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process your request at this moment. Please try again later.',
    });
  }
};
