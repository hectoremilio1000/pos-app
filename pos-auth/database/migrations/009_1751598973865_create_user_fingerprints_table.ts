// database/migrations/000X_create_user_fingerprints.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_fingerprints'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // borra huellas si se elimina el usuario

      table.text('fingerprint_primary').notNullable()
      table.text('fingerprint_secondary').nullable()
      table.smallint('scanner_type').defaultTo(1) // 1 = óptico, 2 = capacitivo…

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      table.primary(['user_id']) // 1-a-1 con users
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
