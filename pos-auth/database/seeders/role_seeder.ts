import Role from '#models/role'

export default class {
  public async run() {
    await Role.createMany([
      { code: 'waiter', name: 'Mesero' },
      { code: 'cashier', name: 'Cajero' },
      { code: 'owner', name: 'Dueño' },
      { code: 'admin', name: 'Admin' },
      { code: 'superadmin', name: 'Super Admin', level: 100 },
    ])
  }
}
