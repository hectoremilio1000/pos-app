// database/migrations/0008_create_permissions.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('code', 80).primary() // p. ej. PRODUCTOS, ORDER_CREATE
      table.string('description', 250).notNullable()
      table.string('category', 60) // catalog, order, cash, admin…
      table.boolean('is_system').defaultTo(false) // true → no se puede borrar

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
