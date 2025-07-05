// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/models/permission.ts

import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Role from '#models/role'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class PaymentMethod extends BaseModel {
  public static table = 'payment_methods'

  /* ── columnas ── */
  @column({ isPrimary: true }) declare id: number
  @column() declare code: string
  @column() declare name: string
  @column() declare enabled: boolean

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime

  /* ── relación con roles vía pivote role_payment_methods ── */
  @manyToMany(() => Role, {
    pivotTable: 'role_payment_methods',
    pivotForeignKey: 'payment_method_id',
    pivotRelatedForeignKey: 'role_id',
  })
  declare roles: ManyToMany<typeof Role>
}
