// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/models/permission.ts

import { DateTime } from 'luxon'

/* 1️⃣  imports que generan código */
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Role from '#models/role'

/* 2️⃣  import-solo-tipo */
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Permission extends BaseModel {
  public static table = 'permissions' // quita schema si no lo usas

  /* ───── columnas ───── */
  @column({ isPrimary: true }) declare code: string
  @column() declare description: string
  @column() declare category?: string
  @column() declare isSystem: boolean
  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime

  /* ───── relación con roles ───── */
  @manyToMany(() => Role, {
    pivotTable: 'role_permissions', // quita prefijo si es public
    pivotForeignKey: 'perm_code',
  })
  declare roles: ManyToMany<typeof Role>
}
