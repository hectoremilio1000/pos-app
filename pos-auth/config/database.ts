import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const ssl = env.get('DB_SSL', 'false') === 'true' ? { rejectUnauthorized: false } : false

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION', 'postgres') as 'postgres',

  connections: {
    postgres: {
      client: 'postgres',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
        ssl,
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
