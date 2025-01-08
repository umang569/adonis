import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UnauthenticatedException extends Exception {
  constructor(message: string) {
    super(message) // Define default message and HTTP status code
  }

  /**
   * Handle the exception
   */
  public async handle(error: this, ctx: HttpContext) {
    console.error('ExceptionHandler', error.message) // Log the error if needed

    let statusCode = 400
    if (error instanceof UnauthenticatedException) {
      statusCode = 401
    }
    ctx.response.status(statusCode).json({
      error: [{ message: error.message }],
    })
  }
}
