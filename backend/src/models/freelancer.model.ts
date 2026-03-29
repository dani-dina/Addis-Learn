import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface IPortfolioItem {
  title: string;
  description?: string;
  projectUrl?: string;
  imageUrl?: string;
}

export interface ISkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
}

export interface IProfile extends Document {
  user: IUser['_id']; 
  title: string; 
  bio?: string;
  hourlyRate?: number;
  skills: ISkill[];
  portfolio: IPortfolioItem[];
  experience?: {
    company: string;
    role: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }[];
  education?: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate?: Date;
  }[];
  languages?: {
    language: string;
    proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
  }[];
  availability?: 'Full-time' | 'Part-time' | 'As needed';
  rating?: number; 
  reviews?: {
    user: IUser['_id'];
    rating: number;
    comment?: string;
    createdAt: Date;
  }[];
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], required: true },
});

const PortfolioSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  projectUrl: { type: String },
  imageUrl: { type: String },
});

const ReviewSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const ProfileSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    bio: { type: String },
    hourlyRate: { type: Number },
    skills: [SkillSchema],
    portfolio: [PortfolioSchema],
    experience: [
      {
        company: { type: String, required: true },
        role: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    education: [
      {
        school: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
      },
    ],
    languages: [
      {
        language: { type: String, required: true },
        proficiency: {
          type: String,
          enum: ['Basic', 'Conversational', 'Fluent', 'Native'],
          required: true,
        },
      },
    ],
    availability: { type: String, enum: ['Full-time', 'Part-time', 'As needed'] },
    rating: { type: Number, default: 0 },
    reviews: [ReviewSchema],
    profilePicture: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>('Profile', ProfileSchema);