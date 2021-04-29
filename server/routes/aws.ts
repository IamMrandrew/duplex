import { Request, Response, Router } from 'express'
import Routes from '.'
import Controller from '../controllers/aws'

// routes for aws related operations
export class AWSRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'AWSRoutes')
  }

  configureRoutes(): void {
    this.router.route('/sign-s3').post((req: Request, res: Response) => {
      Controller.signS3(req, res)
    })
  }
}
