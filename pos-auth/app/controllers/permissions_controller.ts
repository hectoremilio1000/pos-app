// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/controllers/permissions_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import Permission from '#models/permission'
import { storePermissionValidator } from '#validators/store_permission'
import { updatePermissionValidator } from '#validators/update_permission'

export default class PermissionsController {
  public async index() {
    return Permission.all()
  }

  public async store({ request, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    return Permission.create(await request.validateUsing(storePermissionValidator))
  }

  public async update({ params, request, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    const perm = await Permission.findOrFail(params.id)
    perm.merge(await request.validateUsing(updatePermissionValidator))
    await perm.save()
    return perm
  }

  public async destroy({ params, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    const perm = await Permission.findOrFail(params.id)
    await perm.delete()
    return response.noContent()
  }
}
