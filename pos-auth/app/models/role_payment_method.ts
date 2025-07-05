// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/models/role_payment_method.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Role from '#models/role'
import PaymentMethod from '#models/payment_method'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RolePaymentMethod extends BaseModel {
  public static table = 'role_payment_methods'

  /* Clave primaria compuesta */
  @column({ isPrimary: true, columnName: 'role_id' })
  declare roleId: number

  @column({ isPrimary: true, columnName: 'payment_method_id' })
  declare paymentMethodId: number

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime

  /* Relaciones inversas */
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => PaymentMethod)
  declare paymentMethod: BelongsTo<typeof PaymentMethod>
}
