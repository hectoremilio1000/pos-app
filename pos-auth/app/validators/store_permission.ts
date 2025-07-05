import vine from '@vinejs/vine'

/**
 * Validador para crear un permiso (permissions)
 * • code: clave única en MAYÚSCULAS, dígitos o guiones bajos
 * • description: texto legible
 * • category: opcional (“catalog”, “cash”, “order”…)
 * • is_system: boolean (por defecto false)
 */
export const storePermissionValidator = vine.compile(
  vine.object({
    code: vine
      .string()
      .trim()
      .regex(/^[A-Z0-9_]+$/) // p. ej. PRODUCTOS_CREATE
      .toUpperCase(),

    description: vine.string().trim().minLength(3).maxLength(250),

    category: vine.string().trim().maxLength(60).optional(),

    is_system: vine.boolean().optional(),
  })
)
