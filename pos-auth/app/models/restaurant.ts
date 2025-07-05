// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/models/restaurant.ts

import { DateTime } from 'luxon'

/* 1️⃣  ------ imports que generan CÓDIGO en runtime ------ */
import { BaseModel, column, hasMany, beforeFetch, beforeFind, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'

/* 2️⃣  ------ imports-solo-tipo  (no se emiten) ------ */
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Role from './role.js'

export default class Restaurant extends BaseModel {
  /**  Si NO usas schema “identity”, quita la línea siguiente  */
  public static table = 'restaurants'

  /* ────────── columnas ────────── */
  @column({ isPrimary: true }) declare id: number
  @column() declare slug: string
  @column() declare name: string
  @column() declare legalName?: string
  @column() declare addressLine1?: string
  @column() declare city?: string
  @column() declare state?: string
  @column() declare phone?: string
  @column() declare email?: string
  @column() declare timezone: string
  @column() declare currency: string
  @column() declare plan: string
  @column() declare status: string
  @column() declare logoUrl?: string

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime

  /* ────────── relaciones ────────── */
  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  /* ────────── scope global ────────── */
  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(query: ModelQueryBuilderContract<typeof Restaurant>) {
    query.whereNot('status', 'deleted')
  }
}
