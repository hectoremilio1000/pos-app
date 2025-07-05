// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/models/role_permission.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Role from '#models/role'
import Permission from '#models/permission'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RolePermission extends BaseModel {
  public static table = 'role_permissions'

  /* Clave primaria compuesta: usa ambas columnas como ID lógico */
  @column({ isPrimary: true, columnName: 'role_id' })
  declare roleId: number

  @column({ isPrimary: true, columnName: 'perm_code' })
  declare permCode: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /* relaciones */
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => Permission, {
    foreignKey: 'permCode', // ← clave compuesta
    localKey: 'code',
  })
  declare permission: BelongsTo<typeof Permission>
}
