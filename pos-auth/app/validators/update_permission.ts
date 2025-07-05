import vine from '@vinejs/vine'

/**
 * Validador para actualizar un permiso.
 * Todos los campos son opcionales.
 */
export const updatePermissionValidator = vine.compile(
  vine.object({
    code: vine
      .string()
      .trim()
      .regex(/^[A-Z0-9_]+$/)
      .toUpperCase()
      .optional(),

    description: vine.string().trim().minLength(3).maxLength(250).optional(),

    category: vine.string().trim().maxLength(60).optional(),

    is_system: vine.boolean().optional(),
  })
)
