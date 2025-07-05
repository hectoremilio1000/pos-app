// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/controllers/users_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

import User from '#models/user'
import Role from '#models/role'

import { storeUserValidator } from '#validators/store_user'
import { updateUserValidator } from '#validators/update_user'
import type { StoreUserPayload, UpdateUserPayload } from '../Types/user_payloads.js'

export default class UsersController {
  /* ────────────────────────────────────────
   *  GET /api/users
   *  • Superadmin ve todos.
   *  • Admin/Owner ve sólo los de su restaurante.
   * ────────────────────────────────────────*/
  public async index({ auth }: HttpContext) {
    await auth.user?.load('role')

    const q = User.query().preload('role')
    if (auth.user?.restaurantId) {
      q.where('restaurant_id', auth.user.restaurantId)
    }
    return q
  }

  /* ────────────────────────────────────────
   *  POST /api/users
   *  • Crea usuario nuevo.
   *  • Superadmin puede especificar restaurant_id.
   *  • Admin/Owner sólo en su propio restaurante.
   * ────────────────────────────────────────*/
  public async store({ request, auth, response }: HttpContext) {
    await auth.user?.load('role')
    if (!auth.user || !['superadmin', 'admin', 'owner'].includes(auth.user.role.code)) {
      return response.unauthorized({ error: 'Sólo administradores' })
    }

    const payload = (await request.validateUsing(storeUserValidator)) as StoreUserPayload
    const role = await Role.findByOrFail('code', payload.role_code)

    // Si viene en el payload y el creador es superadmin, usa ese; de lo contrario, hereda del creador
    const restaurantId =
      auth.user.role.code === 'superadmin'
        ? (payload.restaurant_id ?? null)
        : auth.user.restaurantId

    if (auth.user.restaurantId && restaurantId !== auth.user.restaurantId) {
      return response.forbidden({ error: 'No puedes crear usuarios en otro restaurante' })
    }

    const user = await User.create({
      fullName: payload.full_name,
      email: payload.email,
      passwordHash: payload.password, // hook hashPwd lo cifra
      restaurantId,
      roleId: role.id,
      status: 'active',
    })

    await user.load('role')
    return response.created(user)
  }

  /* ────────────────────────────────────────
   *  GET /api/users/:id
   * ────────────────────────────────────────*/
  public async show({ params, auth, response }: HttpContext) {
    const user = await User.query().where('id', params.id).preload('role').first()
    if (!user) return response.notFound({ error: 'Usuario no existe' })

    if (auth.user?.restaurantId && auth.user.restaurantId !== user.restaurantId) {
      return response.forbidden({ error: 'Sin permiso para ver este usuario' })
    }

    return user
  }

  /* ────────────────────────────────────────
   *  PUT /api/users/:id
   * ────────────────────────────────────────*/
  public async update({ params, request, auth, response }: HttpContext) {
    await auth.user?.load('role')
    if (!auth.user || !['superadmin', 'admin', 'owner'].includes(auth.user.role.code)) {
      return response.unauthorized({ error: 'Sólo administradores' })
    }

    const user = await User.findOrFail(params.id)

    if (auth.user.restaurantId && auth.user.restaurantId !== user.restaurantId) {
      return response.forbidden({ error: 'No puedes editar usuarios de otro restaurante' })
    }

    const payload = (await request.validateUsing(updateUserValidator)) as UpdateUserPayload

    if (payload.role_code) {
      const role = await Role.findByOrFail('code', payload.role_code)
      user.roleId = role.id
    }
    if (payload.password) user.passwordHash = payload.password

    user.merge({
      fullName: payload.full_name ?? user.fullName,
      email: payload.email ?? user.email,
      status: payload.status ?? user.status,
    })

    await user.save()
    await user.load('role')
    return user
  }

  /* ────────────────────────────────────────
   *  DELETE /api/users/:id
   * ────────────────────────────────────────*/
  public async destroy({ params, auth, response }: HttpContext) {
    await auth.user?.load('role')
    if (!auth.user || !['superadmin', 'admin', 'owner'].includes(auth.user.role.code)) {
      return response.unauthorized({ error: 'Sólo administradores' })
    }

    const user = await User.findOrFail(params.id)

    if (auth.user.restaurantId && auth.user.restaurantId !== user.restaurantId) {
      return response.forbidden({ error: 'No puedes eliminar usuarios de otro restaurante' })
    }

    await user.delete()
    return response.noContent()
  }

  /* ────────────────────────────────────────
   *  POST /api/login
   * ────────────────────────────────────────*/
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.query().where('email', email).preload('role').first()

    if (!user || !(await hash.verify(user.passwordHash, password))) {
      return response.unauthorized({ message: 'Credenciales inválidas' })
    }

    const token = await User.accessTokens.create(user, ['*'], { expiresIn: '30d' })

    return {
      type: 'bearer',
      value: token.value!.release(),
      expiresAt: token.expiresAt,
      user,
    }
  }

  /* ────────────────────────────────────────
   *  GET /api/me
   * ────────────────────────────────────────*/
  public async me({ auth }: HttpContext) {
    await auth.user?.load('role')
    return auth.user
  }
}
