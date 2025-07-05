import vine from '@vinejs/vine'

/**
 * Validador para crear un rol
 *  • code → slug único (letras, números, guiones)
 *  • name → texto legible
 *  • description → opcional
 *  • level → 0-99  (mayor = más privilegios)
 */
export const storeRoleValidator = vine.compile(
  vine.object({
    code: vine
      .string()
      .trim()
      .regex(/^[a-z0-9-]+$/)
      .toLowerCase(),
    name: vine.string().trim().minLength(2).maxLength(120),
    description: vine.string().trim().maxLength(250).optional(),
    level: vine.number().range([0, 99]).optional(),
  })
)
