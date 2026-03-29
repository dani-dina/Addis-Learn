import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface ILesson {
  title: string;
  description?: string;
  videoUrl: string;
  duration: number; 
  resources?: string[]; 
}

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: IUser['_id'];
  category: string;
  price: number;
  discount?: number;
  lessons: ILesson[];
  thumbnailUrl?: string;
  rating?: number; 
  reviews?: {
    user: IUser['_id'];
    rating: number;
    comment?: string;
    createdAt: Date;
  }[];
  studentsEnrolled?: IUser['_id'][];
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema: Schema = new Schema<ILesson>({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  resources: [{ type: String }],
});

const ReviewSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    lessons: [LessonSchema],
    thumbnailUrl: { type: String },
    rating: { type: Number, default: 0 },
    reviews: [ReviewSchema],
    studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', CourseSchema);