// database/seeders/admin_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Role from '#models/role'
import Restaurant from '#models/restaurant'
import hash from '@adonisjs/core/services/hash'

export default class AdminSeeder extends BaseSeeder {
  // quita la línea siguiente si también quieres sembrar en prod
  public static developmentOnly = true

  public async run() {
    /* 1️⃣  Restaurante demo (usa name si no tienes slug) */
    const rest = await Restaurant.firstOrCreate(
      { name: 'Demo Restaurant' },
      { name: 'Demo Restaurant', timezone: 'America/Mexico_City', currency: 'MXN' }
    )

    /* 2️⃣  Rol “owner” (global) — sin restaurantId */
    const ownerRole = await Role.firstOrCreate(
      { code: 'owner' },
      { name: 'Dueño', description: 'Owner global', level: 90 }
    )

    /* 3️⃣  Usuario admin */
    await User.firstOrCreate(
      { email: 'admin@example.com' },
      {
        fullName: 'Admin',
        email: 'admin@example.com',
        passwordHash: await hash.make('secret123'), // cambia después en prod
        restaurantId: rest.id, // admin de ese restaurante
        roleId: ownerRole.id,
        status: 'active',
      }
    )

    console.log('✅  Seeder admin_seeder ejecutado: admin@example.com / secret123')
  }
}
