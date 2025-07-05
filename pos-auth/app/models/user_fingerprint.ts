// /Users/hectoremilio/Proyectos/growthsuitecompleto/pos-app/pos-auth/app/models/user_fingerprint.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserFingerprint extends BaseModel {
  public static table = 'user_fingerprints' // quita prefijo si no usas schema

  /* PK = user_id (1-a-1) */
  @column({ isPrimary: true, columnName: 'user_id' })
  declare userId: number

  @column() declare fingerprintPrimary: string
  @column() declare fingerprintSecondary?: string
  @column() declare scannerType: number

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime

  /* relación inversa */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  /* hook opcional: normalizar huella antes de guardar */
  @beforeSave()
  public static trimPrints(fp: UserFingerprint) {
    if (fp.$dirty.fingerprintPrimary) {
      fp.fingerprintPrimary = fp.fingerprintPrimary.trim()
    }
    if (fp.$dirty.fingerprintSecondary) {
      fp.fingerprintSecondary = fp.fingerprintSecondary?.trim()
    }
  }
}
