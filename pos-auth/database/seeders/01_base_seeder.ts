import Role from '#models/role'
import Permission from '#models/permission'
import PaymentMethod from '#models/payment_method'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run() {
    await Role.updateOrCreateMany('code', [
      { code: 'waiter', name: 'Mesero', level: 1 },
      { code: 'cashier', name: 'Cajero', level: 2 },
      { code: 'owner', name: 'Dueño', level: 9 },
      { code: 'admin', name: 'Admin', level: 10 },
      { code: 'superadmin', name: 'Super Admin', level: 99 },
    ])

    await Permission.updateOrCreateMany('code', [
      { code: 'ORDER_CREATE', description: 'Crear órdenes' },
      { code: 'DISCOUNT_APPLY', description: 'Aplicar descuentos' },
      { code: 'PAYMENT_CHARGE', description: 'Cobrar cuentas' },
    ])

    await PaymentMethod.updateOrCreateMany('code', [
      { code: 'CASH', name: 'Efectivo', enabled: true },
      { code: 'CARD', name: 'Tarjeta', enabled: true },
    ])
  }
}
