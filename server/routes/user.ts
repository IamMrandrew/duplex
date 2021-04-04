import { Request, Response, Router } from 'express'
import Routes from '.'
import controller from '../controllers/user'

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

    this.router.route('/logout').post((req: Request, res: Response) => {
      // controller.logout(req, res)
    })

    this.router.route('/reset').post((req: Request, res: Response) => {
      // controller.resetPassword(req, res)
    })

    this.router.route('/user').get((req: Request, res: Response) => {
      controller.listUsers(req, res)
    })

    this.router.route('/user/:userId').delete((req: Request, res: Response) => {
      controller.deleteUser(req, res)
    })
  }
}
