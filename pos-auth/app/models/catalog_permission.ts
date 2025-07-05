// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/models/permission.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Role from '#models/role'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class CatalogPermission extends BaseModel {
  public static table = 'catalog_permissions'

  /* ── PK compuesta ── */
  @column({ isPrimary: true, columnName: 'role_id' })
  declare roleId: number

  @column({ isPrimary: true, columnName: 'catalog_code' })
  declare catalogCode: string

  /* ── flags ── */
  @column() declare canCreate: boolean
  @column() declare canUpdate: boolean
  @column() declare canDelete: boolean

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime

  /* relación inversa */
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
