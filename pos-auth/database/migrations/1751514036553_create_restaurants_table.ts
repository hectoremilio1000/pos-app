import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.string('slug').notNullable().unique()
      table.string('name', 200).notNullable()
      table.string('legal_name', 200)
      table.string('address_line1', 250)
      table.string('city', 150)
      table.string('state', 150)
      table.string('phone', 50)
      table.string('email', 250)
      table.string('timezone', 64).notNullable().defaultTo('America/Mexico_City')
      table.string('currency', 3).notNullable().defaultTo('MXN')
      table.string('plan').notNullable().defaultTo('free')
      table.string('status').notNullable().defaultTo('active')
      table.text('logo_url')
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
