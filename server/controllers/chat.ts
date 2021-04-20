import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Chat from '../models/chat'
import User from '../models/user'

const Controller = {
  getChats: (req: Request, res: Response) => {
    Chat.find({})
      .populate('users messages.sender')
      .then((chats: any) => {
        Promise.all(
          chats.map((chat: any) => {
            if (chat.users.find((user: any) => user._id == req.userData.userId)) {
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
    const chat = new Chat({ _id: new mongoose.Types.ObjectId(), type: req.body.type })
    chat.users.push(req.userData.userId)
    if (req.body.type === 'Direct') {
      User.findOne({ username: req.body.username })
        .then((user: any) => {
          chat.users.push(user._id)
          chat
            .save()
            .then((chat: any) => {
              res.status(200).json(chat)
            })
            .catch((err: any) => {
              res.status(400).json(err)
            })
        })
        .catch((error: any) => {
          res.status(500).json(error)
        })
    } else {
      chat.title = req.body.title
      chat
        .save()
        .then((chat: any) => {
          res.status(200).json(chat)
        })
        .catch((err: any) => {
          res.status(400).json(err)
        })
    }
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
