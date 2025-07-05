import vine from '@vinejs/vine'

/**
 * Validador para actualizar un método de pago
 * Todos los campos son opcionales.
 */
export const updatePaymentMethodValidator = vine.compile(
  vine.object({
    code: vine
      .string()
      .trim()
      .regex(/^[A-Z0-9_]+$/)
      .toUpperCase()
      .optional(),

    name: vine.string().trim().minLength(2).maxLength(120).optional(),

    enabled: vine.boolean().optional(),
  })
)
