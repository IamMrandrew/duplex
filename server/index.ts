import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'

const app: express.Application = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
  })
} else {
  app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!!')
  })
}

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT)
})
