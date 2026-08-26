import mongoose, { Schema, Document, Model } from 'mongoose';

export type CareerApplicationStatus = 'RECEIVED' | 'REVIEWING' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';

export interface ICareerApplicationDocument extends Document {
  jobId?: string | null;
  jobTitle?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  resumeUrl?: string | null;
  coverLetter: string;
  status: CareerApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const CareerApplicationSchema = new Schema<ICareerApplicationDocument>(
  {
    jobId: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    jobTitle: {
      type: String,
      trim: true,
      default: 'General Application',
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Candidate name is required'],
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
    resumeUrl: {
      type: String,
      trim: true,
      default: null,
    },
    coverLetter: {
      type: String,
      required: [true, 'Cover letter or summary is required'],
      trim: true,
      minlength: 10,
      maxlength: 10000,
    },
    status: {
      type: String,
      enum: ['RECEIVED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED'],
      default: 'RECEIVED',
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'career_applications',
  }
);

CareerApplicationSchema.index({ createdAt: -1 });
CareerApplicationSchema.index({ email: 1, createdAt: -1 });

export const CareerApplicationModel: Model<ICareerApplicationDocument> =
  mongoose.models.CareerApplication ||
  mongoose.model<ICareerApplicationDocument>('CareerApplication', CareerApplicationSchema);

export default CareerApplicationModel;
