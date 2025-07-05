// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/models/user.ts
import { DateTime } from 'luxon'

/* 1️⃣  imports que generan código en runtime */
import { BaseModel, column, belongsTo, beforeSave, hasOne } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import Restaurant from '#models/restaurant'
import Role from '#models/role'
import UserFingerprint from '#models/user_fingerprint'

/* 2️⃣  imports-solo-tipo */
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

/* 3️⃣  AuthFinder mixin (login por email + password) */
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'passwordHash',
})

export default class User extends compose(BaseModel, AuthFinder) {
  /** Si usas schema identity: */
  public static table = 'users'

  /* ───── columnas ───── */
  @column({ isPrimary: true }) declare id: number
  @column({ columnName: 'restaurant_id' })
  declare restaurantId: number | null
  @column() declare roleId: number
  @column() declare fullName?: string
  @column() declare email: string
  @column({ serializeAs: null }) declare passwordHash: string
  @column() declare status: string
  @column.dateTime() declare passwordChangedAt: DateTime | null
  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime

  /* ───── relaciones ───── */
  @belongsTo(() => Restaurant)
  declare restaurant: BelongsTo<typeof Restaurant>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasOne(() => UserFingerprint)
  declare fingerprint: HasOne<typeof UserFingerprint>

  /* ejemplo de relación a pagos, si la tuvieses
  @hasMany(() => Payment)
  declare payments: HasMany<typeof Payment>
  */

  /* ───── hooks ───── */
  @beforeSave()
  public static async hashPwd(user: User) {
    if (user.$dirty.passwordHash) {
      user.passwordHash = await hash.make(user.passwordHash)
      user.passwordChangedAt = DateTime.utc()
    }
  }

  /* ───── tokens API ───── */
  static accessTokens = DbAccessTokensProvider.forModel(User)
}
