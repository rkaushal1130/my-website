import mongoose, { Schema, Document, Model } from 'mongoose';

export type ContactMessageStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';

export interface IContactMessageDocument extends Document {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  status: ContactMessageStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessageDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    company: {
      type: String,
      trim: true,
      default: null,
    },
    service: {
      type: String,
      trim: true,
      default: 'AI Automation',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: 5,
      maxlength: 5000,
    },
    status: {
      type: String,
      enum: ['NEW', 'READ', 'REPLIED', 'ARCHIVED'],
      default: 'NEW',
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'contact_messages',
  }
);

// Compound index for querying new messages quickly
ContactMessageSchema.index({ createdAt: -1 });
ContactMessageSchema.index({ email: 1, createdAt: -1 });

export const ContactMessageModel: Model<IContactMessageDocument> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessageDocument>('ContactMessage', ContactMessageSchema);

export default ContactMessageModel;
