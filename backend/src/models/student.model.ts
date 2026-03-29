import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.model';
import { ICourse } from './course.model';

export interface ICourseProgress {
  course: ICourse['_id'];
  completedLessons: string[]; 
  progressPercentage: number;
  startedAt: Date;
  completedAt?: Date;
}

export interface IStudent extends Document {
  user: IUser['_id']; 
  enrolledCourses: ICourseProgress[];
  wishlist: ICourse['_id'][];
  reviews?: {
    course: ICourse['_id'];
    rating: number;
    comment?: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const CourseProgressSchema: Schema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    completedLessons: [{ type: Schema.Types.ObjectId }],
    progressPercentage: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { _id: false } 
);

const ReviewSchema: Schema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true, _id: false }
);

const StudentSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledCourses: [CourseProgressSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>('Student', StudentSchema);