import mongoose from 'mongoose'
import messageSchema from './message'

const chatSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  type: { type: String, required: true }, // Direct (1 to 1), Spaces (Group)
  title: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Chat', chatSchema)
