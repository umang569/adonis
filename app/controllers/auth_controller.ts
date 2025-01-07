import { postValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import UnauthenticatedException from '#exceptions/unauthenticated_exception'
const data = [
  { id: 1, name: 'umang', age: 19, email: 'umangbindal30@gmail.com', password: 'umang42' },
  { id: 2, name: 'umang Bindal', age: 19, email: 'umangbindal@gmail.com', password: 'umang242' },
  { id: 3, name: 'Umg', age: 19, email: 'umangbind30@gmail.com', password: 'umang442' },
  { id: 4, name: 'Mang', age: 19, email: 'umangbial30@gmail.com', password: 'umang4522' },
]
export default class AuthController {
  public async login({ request }: HttpContext) {
    const data1 = request.body()
    const output = await postValidator.validate(data1)
    const userData = data.find(
      (user: any) => user.email === output.email && user.password === output.password
    )
    if (!userData) {
      throw new UnauthenticatedException()
    }
    console.log('i m auth controller...')
    const token = jwt.sign({ id: userData.id }, 'UMANG', { expiresIn: 60 * 60 })
    return { output: userData, token: token }
  }
}
