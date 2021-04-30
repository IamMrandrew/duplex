import { Server, Socket } from 'socket.io'
import User from '../../models/user'
import Chat from '../../models/chat'
import mongoose from 'mongoose'
import crypto from 'crypto'
require('dotenv').config()

interface ExtSocket extends Socket {
  userData: any
}

const Controller = {
  saveMessage: async (extSocket: any, { id, content }: any) => {
    const user = await User.findById(extSocket.userData.userId)
    let iv = crypto.randomBytes(16)
    let cipher = crypto.createCipheriv('aes-256-cbc', process.env.AES_KEY || '', iv)
    let encryptedMessage = cipher.update(content, 'utf-8', 'hex')
    encryptedMessage = cipher.final('hex')
    let message: any = {
      _id: new mongoose.Types.ObjectId(),
      sender: user,
      readers: [user],
      content: iv.toString('hex') + ':' + encryptedMessage,
      createdAt: Date.now(),
    }
    const chat = await Chat.findByIdAndUpdate(id, { $push: { messages: message } }, { new: true })
    message.content = content

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
  getUserInfo: async (extSocket: any) => {
    return await User.findById(extSocket.userData.userId)
  },
}

export default Controller
