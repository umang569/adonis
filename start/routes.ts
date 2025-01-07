/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', '#controllers/auth_controller.login').use(middleware.another())
router.get('/signup', '#controllers/auth_controller.signup')
router.post('/posting', async () => {
  return {
    posting: 'passed',
  }
})
