import Role from '#models/role'

export default class {
  public async run() {
    await Role.updateOrCreateMany(
      ['code', 'restaurantId'],
      [
        { code: 'waiter', restaurantId: null, name: 'Mesero', level: 10 },
        { code: 'cashier', restaurantId: null, name: 'Cajero', level: 20 },
        { code: 'owner', restaurantId: null, name: 'Dueño', level: 90 },
        { code: 'admin', restaurantId: null, name: 'Admin', level: 100 },
      ]
    )
  }
}
