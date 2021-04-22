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
  createChat: async (req: Request, res: Response) => {
    const chat = new Chat({
      _id: new mongoose.Types.ObjectId(),
      type: req.body.type,
      mode: req.body.mode,
      messages: [],
    })
    const user = await User.findById(req.userData.userId)
    chat.users.push(user)
    if (req.body.type === 'Direct') {
      User.findOne({ username: req.body.username })
        .populate('profile')
        .then((user: any) => {
          chat.users.push(user)
          console.log('The user', chat)
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
      chat.messages.push({
        content:
          chat.mode === 'Conversation'
            ? user.profile[1].name + ' created a spaces'
            : user.profile[0].name + ' created a spaces',
      })
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
        Chat.findOneAndUpdate(
          { _id: req.params.id, type: 'Spaces', users: { $nin: [user._id] } },
          { $push: { users: user } },
        )
          .then(async (result: any) => {
            const chat = await Chat.findOne({ _id: req.params.id })
            chat.messages.push({
              content: chat.mode === 'Conversation' ? user.profile[1].name : user.profile[0].name + ' joined',
            })
            chat
              .save()
              .then((chat: any) => {
                res.status(200).json(chat)
              })
              .catch((err: any) => {
                res.status(400).json(err)
              })
            // res.status(200).json('Successfully joined')
          })
          .catch((error: any) => {
            res.status(500).json('Wrong id or joining same spaces or trying to join a direct message')
          })
      })
      .catch((error: any) => {
        res.status(500).json(error)
      })
  },
}

export default Controller
