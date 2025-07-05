// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/models/role.ts
import { DateTime } from 'luxon'

/* 1️⃣  imports que generan código */
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Permission from '#models/permission'
import PaymentMethod from '#models/payment_method'

/* 2️⃣  imports-solo-tipo */
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Role extends BaseModel {
  public static table = 'roles' // quita schema si no lo usas

  /* ───── columnas ───── */
  @column({ isPrimary: true }) declare id: number
  @column() declare code: string
  @column() declare name: string
  @column() declare description?: string
  @column() declare level: number

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime

  /* ───── relaciones ───── */
  @hasMany(() => User)
  declare users: HasMany<typeof User>
  @manyToMany(() => PaymentMethod, {
    pivotTable: 'role_payment_methods',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'payment_method_id',
  })
  declare paymentMethods: ManyToMany<typeof PaymentMethod>

  @manyToMany(() => Permission, {
    pivotTable: 'role_permissions', // quita prefix si no usas schema
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'perm_code',
  })
  declare permissions: ManyToMany<typeof Permission>
}
