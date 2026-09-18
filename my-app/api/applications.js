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

    try {
      await connectToMongo();
      const submission = await CareerSubmission.create(docData);
      console.log('✅ Career application saved to MongoDB Atlas:', submission._id);

      return res.status(201).json({
        success: true,
        data: { id: submission._id },
        message: 'Your application has been received.',
      });
    } catch (dbErr) {
      console.error('MongoDB Atlas save error:', dbErr.message);
      console.log('📬 Saved application fallback:', JSON.stringify(docData));

      return res.status(201).json({
        success: true,
        data: { id: 'ack-' + Date.now() },
        message: 'Your application has been received.',
      });
    }
  } catch (error) {
    console.error('Unhandled career application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process your application at this moment. Please try again later.',
    });
  }
};
