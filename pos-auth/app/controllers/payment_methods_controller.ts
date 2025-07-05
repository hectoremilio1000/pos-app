// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/controllers/payment_methods_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import PaymentMethod from '#models/payment_method'
import { storePaymentMethodValidator } from '#validators/store_payment_method'
import { updatePaymentMethodValidator } from '#validators/update_payment_method'

export default class PaymentMethodsController {
  public async index() {
    return PaymentMethod.all()
  }

  public async store({ request, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    return PaymentMethod.create(await request.validateUsing(storePaymentMethodValidator))
  }

  public async update({ params, request, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    const pm = await PaymentMethod.findOrFail(params.id)
    pm.merge(await request.validateUsing(updatePaymentMethodValidator))
    await pm.save()
    return pm
  }

  public async destroy({ params, auth, response }: HttpContext) {
    if (auth.user?.role.code !== 'superadmin') {
      return response.unauthorized({ error: 'Sólo superadmin' })
    }
    const pm = await PaymentMethod.findOrFail(params.id)
    await pm.delete()
    return response.noContent()
  }
}
