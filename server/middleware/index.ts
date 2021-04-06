// middleware that are applicable to all routes
import express, { Router } from 'express'
// // import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const middleware = Router()
// // middlewares.use(passport.initialize())
// // middlewares.use(passport.session())
middleware.use(cookieParser())
middleware.use(express.json())
middleware.use(express.urlencoded({ extended: false }))

middleware.use(cors({ credentials: true, origin: true }))

export default middleware
