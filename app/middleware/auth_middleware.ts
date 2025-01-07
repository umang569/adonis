import UnauthenticatedException from '#exceptions/unauthenticated_exception'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'
export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    console.log('i m middleware...')
    const token = ctx.request.header('Authorization')
    if (!token) {
      throw new UnauthenticatedException()
    }
    try {
      jwt.verify(token, 'UMANG')
    } catch (error) {
      throw new UnauthenticatedException()
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
