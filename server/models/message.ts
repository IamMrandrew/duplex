import mongoose from 'mongoose'

export const messageSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Message', messageSchema)
