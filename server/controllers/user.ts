import { Request, Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import { isEmail, log, ONE_DAY, sendError } from '../utils'

const Controller = {
  signup: (req: Request, res: Response) => {
    const newUser = new User({
      ...req.body,
      profile:[{ name: req.body.username, bio: 'Hello world from chat!' }, { name: req.body.username, bio: 'Hello world from conversation!' }]
    })
    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) return sendError(res, 500, 'failed to hash password')
      newUser.password = hash
      newUser._id = new mongoose.Types.ObjectId()
      console.log(newUser)
      newUser.save().then((user:any)=>{
        log(user)
        return res.status(201).json({ message: 'User created' })
      }).catch((err:any)=>{
        console.log(err)
        if (err.message.match('duplicate key')) {
          if (err.message.match('email')) return sendError(res, 500, 'Email already exists')
          if (err.message.match('username')) return sendError(res, 500, 'Username already exists')
        } else return sendError(res, 500, 'Error in creating new user', err.toString())
      })
    })
  },
  login: (req: Request, res: Response) => {
    const { emailOrUsername, password } = req.body
    const query = isEmail(emailOrUsername) ? { email: emailOrUsername } : { username: emailOrUsername }
    User.findOne(query)
      .exec()
      .then((user: any) => {
        // might need to type this rather than simply <any>
        if (!user) return sendError(res, 401, 'User does not exist')
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return sendError(res, 401, 'Failed to comapre password')
          if (result) {
            // valid password
            const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_TOKEN || '', {
              expiresIn: ONE_DAY,
            })
            user.password = null
            return res
              .status(200)
              .cookie('token', token, {
                sameSite: 'strict',
                path: '/',
                maxAge: ONE_DAY,
                httpOnly: true,
              })
              .send({ message: 'logged in', user: user })
          }
          return sendError(res, 401, 'Incorrect password')
        })
      })
      .catch((err: any) => {
        return sendError(res, 500, JSON.stringify(err), err)
      })
  },
  logout: (req: Request, res: Response) => {
    res.status(202).clearCookie('token').json({
      message: 'Logged out',
    })
  },
  reset: () => {}, // reset password
  listUsers: (req: Request, res: Response) => {
    User.find({})
      .then((users: any) => {
        res.status(200).send(users)
      })
      .catch((err: any) => {
        return sendError(res, 500, 'Error in getting users', err)
      })
  },
  getUser: (req: Request, res: Response) => {
    User.findOne({ _id: req.userData.userId })
      .then((user: any) => {
        log(user as string)
        return res.status(202).json(user)
      })
      .catch((err: any) => {
        return sendError(res, 500, 'Error in getting user info', err)
      })
  },
  deleteUser: (req: Request, res: Response) => {
    const userId = new mongoose.Types.ObjectId(<string>req.params.userId)
    User.deleteOne({ _id: userId })
      .exec()
      .then((result: any) => {
        if (!result.deletedCount) return sendError(res, 500, 'No user deleted', JSON.stringify(result))
        res.status(200).json({
          message: 'User deleted',
        })
      })
      .catch((err: any) => {
        sendError(res, 500, err.toString(), err)
      })
  },
  updateProfile: (req: Request, res: Response) => {
    User.findOne({ _id: req.userData.userId })
      .then((user: any) => {
        user.profile[req.body.selected].name = req.body.name
        user.profile[req.body.selected].bio = req.body.bio
        user.profile[req.body.selected].picture = req.body.picture
        user.save()
        return res.status(202).json(user)
      })
      .catch((err: any) => {
        return sendError(res, 500, 'Error in updating user profile', err)
      })
  },
}

export default Controller
