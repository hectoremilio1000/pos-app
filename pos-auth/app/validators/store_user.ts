import vine, { SimpleMessagesProvider } from '@vinejs/vine'

/**
 * Puedes definir un provider de mensajes aquí o usar el global.
 */
vine.messagesProvider = new SimpleMessagesProvider({
  'email.unique': 'El correo ya está registrado',
})

/**
 * Esquema ↓
 */
export const storeUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().optional(),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        // regla unique
        return !(await db.from('users').where('email', value).first())
      }),
    password: vine.string().minLength(6),
  })
)
