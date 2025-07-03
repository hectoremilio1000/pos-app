import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    await User.firstOrCreate(
      { email: 'admin@example.com' },
      { fullName: 'Admin', password: 'secret' }
    )
  }
}
