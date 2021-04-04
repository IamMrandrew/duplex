import express, { Router } from 'express'
// // import passport from 'passport'
import bodyParser from 'body-parser'
import cors from 'cors'

const middlewares = Router()
// // middlewares.use(passport.initialize())
// // middlewares.use(passport.session())

middlewares.use(express.json())
middlewares.use(bodyParser.urlencoded({ extended: false }))
middlewares.use(bodyParser.json())
middlewares.use(cors({ credentials: true, origin: true }))

export default middlewares
