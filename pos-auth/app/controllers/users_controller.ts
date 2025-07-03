// app/Controllers/Http/UsersController.ts
//--------------------------------------------------------------
import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

import { storeUserValidator } from '#validators/store_user'
import { updateUserValidator } from '#validators/update_user'

export default class UsersController {
  /**
   * GET /api/users
   * Lista todos los usuarios
   */
  public async index() {
    return User.all()
  }

  /**
   * POST /api/users
   * Crea un usuario nuevo (se requiere token y rol adecuado si lo controlas)
   */
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeUserValidator) // ✅
    const user = await User.create(payload)
    return response.created(user)
  }

  /**
   * GET /api/users/:id
   * Muestra un usuario por ID
   */
  public async show({ params }: HttpContext) {
    return User.findOrFail(params.id)
  }

  /**
   * PUT /api/users/:id
   * Actualiza datos básicos; no expone password aquí (haz un endpoint aparte)
   */
  public async update({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(updateUserValidator) // ✅
    user.merge(payload)
    await user.save()
    return user
  }

  /**
   * DELETE /api/users/:id
   */
  public async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.noContent()
  }

  // ────────────────────────────────────────────────────────────
  //  Métodos de autenticación
  // ────────────────────────────────────────────────────────────

  /**
   * POST /api/login
   * Devuelve un token Bearer válido para el guard "api"
   */
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user || !(await Hash.verify(user.password, password))) {
      return response.unauthorized({ message: 'Credenciales inválidas' })
    }

    // antes (falla porque 'accessTokens' no existe en la instancia):
    // const token = await user.accessTokens.create({ expiresIn: '30d' })

    // ahora:
    const token = await User.accessTokens.create(user, ['*'], { expiresIn: '30d' })
    return {
      type: 'bearer',
      value: token.value!.release(), // sólo se ve una vez
      expiresAt: token.expiresAt,
    }
  }

  /**
   * GET /api/me  (protegida con middleware 'auth')
   * Devuelve el perfil del usuario autenticado
   */
  public async me({ auth }: HttpContext) {
    return auth.user
  }
}
