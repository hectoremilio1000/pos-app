import vine, { SimpleMessagesProvider } from '@vinejs/vine'

/* Mensajes globales en español */
vine.messagesProvider = new SimpleMessagesProvider({
  'email.unique': 'El correo ya está registrado',
  'email.email': 'Correo inválido',
  'password.minLength': 'La contraseña debe tener al menos 6 caracteres',
  'role_code.required': 'Debes indicar un rol',
})

export const storeUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().optional(),

    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        return !(await db.from('identity.users').where('email', value).first())
      }),

    password: vine.string().minLength(6),

    role_code: vine.string().trim().toLowerCase(), // waiter, cashier, owner, admin…
  })
)
