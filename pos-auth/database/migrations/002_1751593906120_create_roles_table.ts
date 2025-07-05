// database/migrations/002_XXXX_create_roles_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()

      table.string('code', 40).notNullable().unique() // waiter, cashier…
      table.string('name', 120).notNullable() // texto legible
      table.string('description', 250) // opcional
      table.smallint('level').defaultTo(1).notNullable() // 1=low 10=super-admin

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
