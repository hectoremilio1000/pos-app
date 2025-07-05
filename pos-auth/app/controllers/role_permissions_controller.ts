// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/controllers/role_permissions_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import Permission from '#models/permission'

export default class RolePermissionsController {
  /* GET /api/roles/:id/permissions */
  public async index({ params }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    await role.load('permissions')
    return role.permissions
  }

  /* POST /api/roles/:id/permissions (body: perm_codes: string[]) */
  public async attach({ params, request, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    const role = await Role.findOrFail(params.id)
    const codes: string[] = request.input('perm_codes') ?? []
    await Permission.query().whereIn('code', codes) // validez
    await role.related('permissions').sync(codes) // reemplaza
    await role.load('permissions')
    return role.permissions
  }
}
