import { Request, Response, Router } from 'express'
import Routes from '.'
import controller from '../controllers/chat'
import auth from '../middleware/auth'

// routes for user related operations
export default class ChatRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'ChatRoutes')
  }

  configureRoutes(): void {
    this.router.route(`/chat`).get(auth, (req: Request, res: Response) => {
      controller.getChats(req, res)
    })

    this.router.route(`/chat/:id`).get(auth, (req: Request, res: Response) => {
      controller.joinChat(req, res)
    })

    this.router.route(`/chat`).post(auth, (req: Request, res: Response) => {
      controller.createChat(req, res)
    })
  }
}
