// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/controllers/user_fingerprints_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import UserFingerprint from '#models/user_fingerprint'
import User from '#models/user'

export default class UserFingerprintsController {
  /* GET /api/users/:id/fingerprint */
  public async show({ params, auth, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    if (auth.user?.restaurantId && auth.user.restaurantId !== user.restaurantId) {
      return response.forbidden({ error: 'No permitido' })
    }
    const fp = await user.related('fingerprint').query().first()
    return fp ?? response.notFound({ error: 'Sin huella' })
  }

  /* PUT /api/users/:id/fingerprint */
  public async update({ params, request, auth, response }: HttpContext) {
    if (!auth.user || !['superadmin', 'admin', 'owner'].includes(auth.user.role.code)) {
      return response.unauthorized({ error: 'Sólo administradores' })
    }

    const user = await User.findOrFail(params.id)
    if (auth.user.restaurantId && auth.user.restaurantId !== user.restaurantId) {
      return response.forbidden({ error: 'No permitido' })
    }

    /* mapea nombres de payload → campos del modelo */
    const raw = request.only(['fingerprint_primary', 'fingerprint_secondary', 'scanner_type'])
    const data = {
      fingerprintPrimary: raw.fingerprint_primary,
      fingerprintSecondary: raw.fingerprint_secondary,
      scannerType: raw.scanner_type,
    }

    const fp = await UserFingerprint.updateOrCreate({ userId: user.id }, data)
    return fp
  }

  /* DELETE /api/users/:id/fingerprint */
  public async destroy({ params, auth, response }: HttpContext) {
    if (!auth.user || !['superadmin', 'admin', 'owner'].includes(auth.user.role.code)) {
      return response.unauthorized({ error: 'Sólo administradores' })
    }

    const fp = await UserFingerprint.findByOrFail('userId', params.id)
    if (auth.user.restaurantId && auth.user.restaurantId !== fp.user.restaurantId) {
      return response.forbidden({ error: 'No permitido' })
    }

    await fp.delete()
    return response.noContent()
  }
}
