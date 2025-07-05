/*********************************************************************
 * start/routes.ts  — mapa completo de endpoints para pos-auth
 * ───────────────────────────────────────────────────────────────────
 *  • Endpoints públicos:  /, /health, /api/login
 *  • Todo lo demás vive bajo /api y requiere JWT (middleware.auth)
 *  • Se usan rutas RESTful + un puñado de rutas anidadas
 *********************************************************************/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

/* ──────────── PING PÚBLICOS ──────────── */
router.get('/', () => ({ hello: 'world' }))
router.get('/health', () => ({ ok: true }))

/* ──────────── LOGIN (público) ──────────── */
router.post('/api/login', '#controllers/users_controller.login')

/* ──────────── RUTAS PROTEGIDAS (/api/…) ──────────── */
router
  .group(() => {
    /* sesión actual */
    router.get('/me', '#controllers/users_controller.me')

    /* ─────── USERS ─────── */
    router.resource('users', '#controllers/users_controller').apiOnly()
    router.get('users/:id/fingerprint', '#controllers/user_fingerprints_controller.show')
    router.put('users/:id/fingerprint', '#controllers/user_fingerprints_controller.update')
    router.delete('users/:id/fingerprint', '#controllers/user_fingerprints_controller.destroy')

    /* ─────── ROLES ─────── */
    router.resource('roles', '#controllers/roles_controller').apiOnly()
    router.get('roles/:id/permissions', '#controllers/role_permissions_controller.index')
    router.post('roles/:id/permissions', '#controllers/role_permissions_controller.attach')
    router.get('roles/:id/payment-methods', '#controllers/role_payment_methods_controller.index')
    router.post('roles/:id/payment-methods', '#controllers/role_payment_methods_controller.attach')
    router.get('roles/:id/catalog-permissions', '#controllers/catalog_permissions_controller.index')
    router.post(
      'roles/:id/catalog-permissions',
      '#controllers/catalog_permissions_controller.upsert'
    )

    /* ─────── PERMISSIONS ─────── */
    router.resource('permissions', '#controllers/permissions_controller').apiOnly()

    /* ─────── PAYMENT METHODS ─────── */
    router.resource('payment-methods', '#controllers/payment_methods_controller').apiOnly()

    /* ─────── RESTAURANTS ─────── */
    router.resource('restaurants', '#controllers/restaurants_controller').apiOnly()
  })
  .prefix('api')
  .use(middleware.auth({ guards: ['api'] }))
