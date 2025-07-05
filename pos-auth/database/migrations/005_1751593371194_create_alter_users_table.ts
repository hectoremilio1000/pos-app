// database/migrations/005_1751593371194_alter_users_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    /* 1️⃣  Renombra password → password_hash si aún existe */
    this.schema.raw(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'users' AND column_name = 'password'
        ) THEN
          ALTER TABLE "users" RENAME COLUMN password TO password_hash;
        END IF;
      END $$;
    `)

    /* 2️⃣  Agrega columnas que falten (todas con IF NOT EXISTS) */
    this.schema.raw(`
      ALTER TABLE "users"
        ADD COLUMN IF NOT EXISTS restaurant_id        bigint NULL,
        ADD COLUMN IF NOT EXISTS role_id              bigint,
        ADD COLUMN IF NOT EXISTS password_hash        varchar(255) NULL,
        ADD COLUMN IF NOT EXISTS status               varchar(255) NOT NULL DEFAULT 'active',
        ADD COLUMN IF NOT EXISTS password_changed_at  timestamptz NULL;
    `)

    /* 3️⃣  Crea claves foráneas solo si no existen */
    this.schema.raw(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint
          WHERE conname = 'users_role_fk'
        ) THEN
          ALTER TABLE "users"
            ADD CONSTRAINT users_role_fk
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT;
        END IF;
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint
          WHERE conname = 'users_restaurant_fk'
        ) THEN
          ALTER TABLE "users"
            ADD CONSTRAINT users_restaurant_fk
            FOREIGN KEY (restaurant_id)
            REFERENCES restaurants(id) ON DELETE CASCADE;
        END IF;
      END $$;
    `)

    /* 4️⃣  Índices únicos (compuesto + parcial) */
    this.schema.raw(`
      CREATE UNIQUE INDEX IF NOT EXISTS users_restaurant_email
        ON "users" (restaurant_id, email);

      CREATE UNIQUE INDEX IF NOT EXISTS users_global_email
        ON "users" (email)
        WHERE restaurant_id IS NULL;
    `)
  }

  public async down() {
    /* elimina índices y FKs que creó este migration */
    this.schema.raw(`
      DROP INDEX IF EXISTS users_global_email;
      DROP INDEX IF EXISTS users_restaurant_email;

      ALTER TABLE "users"
        DROP CONSTRAINT IF EXISTS users_role_fk,
        DROP CONSTRAINT IF EXISTS users_restaurant_fk,
        DROP COLUMN     IF EXISTS restaurant_id,
        DROP COLUMN     IF EXISTS role_id,
        DROP COLUMN     IF EXISTS status,
        DROP COLUMN     IF EXISTS password_changed_at;
      -- NO borramos password_hash para conservar datos
    `)
  }
}
