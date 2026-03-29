import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  bio?: string;
  avatarUrl?: string;
  user: mongoose.Schema.Types.ObjectId;
}

const ProfileSchema: Schema = new Schema({
  bio: { type: String },
  avatarUrl: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IProfile>('Profile', ProfileSchema);