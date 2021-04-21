import { NextFunction, Request, Response, Router } from 'express'
import Routes from '.'
import controller from '../controllers/user'
import auth from '../middleware/auth'

// routes for user related operations
export default class UserRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'UserRoutes')
  }

  configureRoutes(): void {
    this.router.route(`/login`).post((req: Request, res: Response) => {
      controller.login(req, res)
    })

    this.router.route(`/signup`).post((req: Request, res: Response) => {
      controller.signup(req, res)
    })

    this.router.route('/logout').post(auth, (req: Request, res: Response) => {
      controller.logout(req, res)
    })

    this.router.route('/reset').post((req: Request, res: Response) => {
      // controller.resetPassword(req, res)
    })

    this.router.route('/users').get(auth, (req: Request, res: Response) => {
      controller.listUsers(req, res)
    })

    this.router.route('/user').get(auth, (req: Request, res: Response) => {
      controller.getUser(req, res)
    })

    this.router.route('/user').put(auth, (req: Request, res: Response) => {
      controller.updateProfile(req, res)
    })

    this.router.route('/user/:userId').delete(auth, (req: Request, res: Response) => {
      controller.deleteUser(req, res)
    })
  }
}
