import vine from '@vinejs/vine'

/**
 * Validador para actualizar un rol
 * Todos los campos son opcionales; sólo valida lo que llegue.
 */
export const updateRoleValidator = vine.compile(
  vine.object({
    code: vine
      .string()
      .trim()
      .regex(/^[a-z0-9-]+$/)
      .toLowerCase()
      .optional(),
    name: vine.string().trim().minLength(2).maxLength(120).optional(),
    description: vine.string().trim().maxLength(250).optional(),
    level: vine.number().range([0, 99]).optional(),
  })
)
