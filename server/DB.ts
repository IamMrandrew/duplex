import mongoose from 'mongoose'
import { log } from './utils'

const connect = () => {
  console.log(process.env.DB_URL)
  mongoose.connect(process.env.DB_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })

  const db = mongoose.connection

  db.on('error', () => log(`[MongoDB] connection error`))
  db.once('open', () => log(`[MongoDB] successful connection`))
}

export default connect
