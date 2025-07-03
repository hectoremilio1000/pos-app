import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AdminSeeder from './admin_seeder.js'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    // 1. creas la instancia y le inyectas el client
    const adminSeeder = new AdminSeeder(this.client)

    // 2. ejecutas su run()
    await adminSeeder.run()
  }
}
