import mongoose from 'mongoose'

export const profileSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  bio: { type: String, required: true },
})

export default mongoose.model('Profile', profileSchema)
