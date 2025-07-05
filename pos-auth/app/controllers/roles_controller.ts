// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/controllers/roles_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import { storeRoleValidator } from '#validators/store_role'
import { updateRoleValidator } from '#validators/update_role'

export default class RolesController {
  /* GET /api/roles */
  public async index() {
    return Role.all()
  }

  /* POST /api/roles */
  public async store({ request, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    const data = await request.validateUsing(storeRoleValidator)
    return Role.create(data)
  }

  /* PUT /api/roles/:id */
  public async update({ params, request, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    const role = await Role.findOrFail(params.id)
    role.merge(await request.validateUsing(updateRoleValidator))
    await role.save()
    return role
  }

  /* DELETE /api/roles/:id */
  public async destroy({ params, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    const role = await Role.findOrFail(params.id)
    await role.delete()
    return response.noContent()
  }
}
