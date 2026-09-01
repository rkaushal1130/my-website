import mongoose, { Document, Schema } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICareerApplication extends Document {
  name: string;
  email: string;
  phone?: string;
  role: string;
  experience: string;
  portfolio?: string;
  resume?: string;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Contact Form Submission Schema
 * Contains ONLY: Full Name, Email Address, Phone Number, Company Name, Area of Interest / Service, Message
 */
const contactSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    service: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'website',
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        return ret;
      },
    },
  }
);

contactSchema.index({ name: 'text', email: 'text', message: 'text' });

/**
 * Career Apply Form Submission Schema
 * Contains ONLY:
 * 1. Full Name (name)
 * 2. Email Address (email)
 * 3. Phone Number (phone)
 * 4. Primary Role / Focus Area (role)
 * 5. Experience Level (experience)
 * 6. LinkedIn / Portfolio / GitHub Profile (portfolio)
 * 7. Resume / CV File (resume)
 * 8. Introduction / Why NeverquiT AI? (introduction)
 */
const applicationSchema = new Schema<ICareerApplication>(
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
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        return ret;
      },
    },
  }
);

applicationSchema.index({ name: 'text', email: 'text', role: 'text' });

export const ContactSubmission =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactMessage>('ContactSubmission', contactSchema, 'website');

export const CareerSubmission =
  mongoose.models.CareerSubmission ||
  mongoose.model<ICareerApplication>('CareerSubmission', applicationSchema, 'website');
