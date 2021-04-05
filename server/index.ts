import express, { Request, Response } from 'express'
import Routes from './routes'
import path from 'path'
import UserRoutes from './routes/user'
import connectDB from './DB'
import middlewares from './middlewares'
require('dotenv').config()

const app: express.Application = express()

app.use(middlewares)

// db connection
connectDB()

// app routes
const routes: Array<Routes> = []
const router = express.Router()

routes.push(new UserRoutes(router))

app.use('/api', router)
//

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
