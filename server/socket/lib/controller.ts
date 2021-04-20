import { Server, Socket } from 'socket.io'
import User from '../../models/user'
import Chat from '../../models/chat'
import mongoose from 'mongoose'
import e from 'express'

interface ExtSocket extends Socket {
  userData: any
}

const Controller = {
  saveMessage: async (extSocket: any, { id, content }: any) => {
    const user = await User.findById(extSocket.userData.userId)
    const message: any = {
      _id: new mongoose.Types.ObjectId(),
      sender: user,
      readers: [user],
      content: content,
      createdAt: Date.now(),
    }
    const chat = await Chat.findByIdAndUpdate(id, { $push: { messages: message } }, { new: true })

    return message
  },
  readMessage: async (extSocket: any, { id }: any) => {
    const user = await User.findById(extSocket.userData.userId)
    try {
      const chat = await Chat.findById(id).populate('messages')
      if (chat) {
        chat.messages.forEach((message: any) => {
          if (message.readers.find((reader: any) => reader == extSocket.userData.userId)) {
          } else {
            message.readers = [...message.readers, extSocket.userData.userId]
          }
        })

        chat
          .save()
          .then((chat: any) => {
            console.log('saved')
          })
          .catch((err: any) => {
            console.log(err)
          })
      }

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },
}

export default Controller
