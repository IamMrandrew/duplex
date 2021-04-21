import mongoose from 'mongoose'
import { profileSchema } from './profile'

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }, // pending || active
  profile: [profileSchema],
})

export default mongoose.model('User', userSchema)
