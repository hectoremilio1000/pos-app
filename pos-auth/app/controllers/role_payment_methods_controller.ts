// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/controllers/role_payment_methods_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import PaymentMethod from '#models/payment_method'

export default class RolePaymentMethodsController {
  /* GET /api/roles/:id/payment-methods */
  public async index({ params }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    await role.load('paymentMethods')
    return role.paymentMethods
  }

  /* POST /api/roles/:id/payment-methods  body: ids:number[] */
  public async attach({ params, request, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    const ids: number[] = request.input('payment_method_ids') ?? []
    await PaymentMethod.query().whereIn('id', ids)
    const role = await Role.findOrFail(params.id)
    await role.related('paymentMethods').sync(ids)
    await role.load('paymentMethods')
    return role.paymentMethods
  }
}
