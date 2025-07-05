// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/database/migrations/004_1751599604992_create_payment_methods_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payment_methods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id') // PK
      table.string('code', 40).notNullable().unique() // “EFECTIVO”, “TARJETA”, …
      table.string('name', 120).notNullable() // Texto que ve el cajero
      table.boolean('enabled').defaultTo(true) // Ocultar sin borrar

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
