// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/database/migrations/008_1751599051452_create_catalog_permissions_table.ts

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'catalog_permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')

      table.string('catalog_code', 120) // p. ej.  "PRODUCTOS"

      table.boolean('can_create').defaultTo(false)
      table.boolean('can_update').defaultTo(false)
      table.boolean('can_delete').defaultTo(false)

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      table.primary(['role_id', 'catalog_code']) // PK compuesta
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
