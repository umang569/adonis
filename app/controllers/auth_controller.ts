import { postValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import UnauthenticatedException from '#exceptions/unauthenticated_exception'
import User from '#models/user'
import bcrypt from 'bcrypt'

// const data = [
//   { id: 1, name: 'umang', age: 19, email: 'umangbindal30@gmail.com', password: 'umang42' },
//   { id: 2, name: 'umang Bindal', age: 19, email: 'umangbindal@gmail.com', password: 'umang242' },
//   { id: 3, name: 'Umg', age: 19, email: 'umangbind30@gmail.com', password: 'umang442' },
//   { id: 4, name: 'Mang', age: 19, email: 'umangbial30@gmail.com', password: 'umang4522' },
// ]
export default class AuthController {
  public async login({ request }: HttpContext) {
    const data1 = request.body()
    const output = await postValidator.validate(data1)
    // const user_data=data.find((user:any)=>user.email===output.email && user.password===output.password)
    const user = await User.findBy('email', output.email)

    if (!user) {
      throw new UnauthenticatedException('User not found')
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const pass_match = await bcrypt.compare(output.password, user.password)
    if (!pass_match) {
      throw new UnauthenticatedException('Invalid password')
    }

    console.log('i m auth controller...')

    const token = jwt.sign({ id: user.id }, 'UMANG', { expiresIn: 60 * 60 })

    return { output: user, token: token }
  }
  public async signup({ request }: HttpContext) {
    const data = request.body()
    const output = await postValidator.validate(data)
    const hasedpassword = await bcrypt.hash(output.password, 10)
    console.log(hasedpassword)

    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const user_data = await User.create({
        name: output.name,
        email: output.email,
        password: hasedpassword,
      })
      console.log('USER DATA', user_data)
      return { output: user_data }
    } catch (error) {
      console.log(output)
      throw new UnauthenticatedException('User already exists')
    }
  }
}
