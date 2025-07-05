// app/controllers/catalog_permissions_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import CatalogPermission from '#models/catalog_permission'

export default class CatalogPermissionsController {
  /* GET /api/roles/:id/catalog-permissions */
  public async index({ params }: HttpContext) {
    return CatalogPermission.query().where('role_id', params.id)
  }

  /* POST /api/roles/:id/catalog-permissions
     Body: { catalog_code, can_create, can_update, can_delete }
  */
  public async upsert({ params, request, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }

    const role = await Role.findOrFail(params.id)

    /* 1️⃣  Extrae y mapea a camelCase */
    const raw = request.only(['catalog_code', 'can_create', 'can_update', 'can_delete'])

    const data = {
      catalogCode: raw.catalog_code,
      canCreate: Boolean(raw.can_create),
      canUpdate: Boolean(raw.can_update),
      canDelete: Boolean(raw.can_delete),
    }

    /* 2️⃣  Upsert */
    const record = await CatalogPermission.updateOrCreate(
      { roleId: role.id, catalogCode: data.catalogCode },
      data
    )

    return record
  }
}
