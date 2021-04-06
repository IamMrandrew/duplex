import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { log, sendError } from '../utils'

declare global {
  namespace Express {
    interface Request {
      userData?: any
    }
  }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  jwt.verify(req.cookies?.token, process.env.JWT_TOKEN || '', async (verifyErr: any, decoded: any) => {
    if (verifyErr.message == 'jwt expired') return sendError(res, 401, 'Token expried', verifyErr)
    if (verifyErr.message == 'jwt must be provided') return sendError(res, 401, 'Unauthorized', verifyErr)
    if (decoded) {
      req.userData = decoded
      next()
    }
  })
}

export default auth
