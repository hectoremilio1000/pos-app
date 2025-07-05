// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/database/migrations/006_1751597562413_create_role_permissions_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')

      table.string('perm_code', 80).references('code').inTable('permissions').onDelete('CASCADE')

      table.timestamp('created_at').defaultTo(this.now())

      table.primary(['role_id', 'perm_code']) // PK compuesta
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
