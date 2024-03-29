import { RequestHandler, Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import { getUserId } from '../components/auth/auth.engine'
import config from 'finpoq/config/default'

const auth: RequestHandler = async (req: Request, res: Response, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ error: 'Access denied' })
  }

  try {
    jwt.verify(token, config.jwt)

    const userId = getUserId(token)
    if (!userId) throw new Error('User could not be found')

    req.body.userId = userId

    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ error: 'Access denied' })
  }
}

export default auth
