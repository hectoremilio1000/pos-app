// database/seeders/admin_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Role from '#models/role'
import Restaurant from '#models/restaurant'
import hash from '@adonisjs/core/services/hash'

export default class AdminSeeder extends BaseSeeder {
  public static developmentOnly = true // evita sembrar en prod; quítalo si lo necesitas

  public async run() {
    /*
     * 1. Nos aseguramos de que exista al menos un restaurante de demo.
     *    Si ya tienes uno, cambia el slug o quita esta parte.
     */
    const rest = await Restaurant.firstOrCreate(
      { slug: 'demo-rest' },
      { name: 'Demo Restaurant', timezone: 'America/Mexico_City', currency: 'MXN' }
    )

    /*
     * 2. Rol “owner” (global) o por restaurante
     */
    const ownerRole = await Role.firstOrCreate(
      { code: 'owner', restaurantId: null }, // null = rol global
      { name: 'Dueño', description: 'Owner global', level: 90 }
    )

    /*
     * 3. Usuario admin — email único
     */
    await User.firstOrCreate(
      { email: 'admin@example.com' },
      {
        fullName: 'Admin',
        email: 'admin@example.com',
        passwordHash: await hash.make('secret123'), // cambia por contraseña fuerte
        restaurantId: rest.id,
        roleId: ownerRole.id,
        status: 'active',
      }
    )

    console.log('✅  Seeder admin_seeder ejecutado: admin@example.com / secret123')
  }
}
