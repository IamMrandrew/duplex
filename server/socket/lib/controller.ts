import { Server, Socket } from 'socket.io'
import User from '../../models/user'
import Chat from '../../models/chat'
import mongoose from 'mongoose'

interface ExtSocket extends Socket {
  userData: any
}

const Controller = {
  saveMessage: async (extSocket: any, { id, content }: any) => {
    const user = await User.findById(extSocket.userData.userId)
    const message: any = {
      _id: new mongoose.Types.ObjectId(),
      sender: user,
      content: content,
      createdAt: Date.now(),
    }
    const chat = await Chat.findByIdAndUpdate(id, { $push: { messages: message } }, { new: true })

    return message
  },
}

export default Controller
