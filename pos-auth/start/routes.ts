import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

// Ping públicos
router.get('/', () => ({ hello: 'world' }))
router.get('/health', () => ({ ok: true }))

// Autenticación
router.post('/api/login', '#controllers/users_controller.login')

// Rutas protegidas
router
  .group(() => {
    router.get('/me', '#controllers/users_controller.me')
    router.resource('users', '#controllers/users_controller').apiOnly()
  })
  .prefix('api')
  .use(middleware.auth({ guards: ['api'] }))
