import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Chat from '../models/chat'
import User from '../models/user'

const Controller = {
  getChats: (req: Request, res: Response) => {
    Chat.find({})
      .then((chats: any) => {
        Promise.all(
          chats.map((chat: any) => {
            if (chat.users.find((user: string) => user == req.userData.userId)) {
              return chat
            }
          }),
        ).then((result) => {
          res.status(200).json(result.filter((element) => element != null))
        })
      })
      .catch((err: any) => {
        res.status(500).json(err)
      })
  },
  createChat: (req: Request, res: Response) => {
    const chat = new Chat(req.body)
    chat._id = new mongoose.Types.ObjectId()
    chat.users.push(req.userData.userId)
    console.log(chat)
    chat
      .save()
      .then((chat: any) => {
        res.status(200).json(chat)
      })
      .catch((err: any) => {
        res.status(400).json(err)
      })
  },
  joinChat: (req: Request, res: Response) => {
    User.findById(req.userData.userId)
      .then((user: any) => {
        Chat.findByIdAndUpdate(req.body.id, { $push: { users: user } })
          .then((result: any) => {
            res.status(200).json('Successfully joined')
          })
          .catch((error: any) => {
            res.status(500).json(error)
          })
      })
      .catch((error: any) => {
        res.status(500).json(error)
      })
  },
}

export default Controller
