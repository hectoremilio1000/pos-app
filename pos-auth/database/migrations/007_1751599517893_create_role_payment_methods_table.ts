// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/database/migrations/007_1751599517893_create_role_payment_methods_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_payment_methods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')

      table
        .bigInteger('payment_method_id')
        .unsigned()
        .references('id')
        .inTable('payment_methods')
        .onDelete('CASCADE')

      table.timestamp('created_at').defaultTo(this.now())
      table.primary(['role_id', 'payment_method_id']) // PK compuesta
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
