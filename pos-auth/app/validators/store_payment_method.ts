import vine from '@vinejs/vine'

/**
 * Validador para crear un método de pago
 * • code  : slug único en MAYÚSCULAS (EFECTIVO, TARJETA, etc.)
 * • name  : texto descriptivo que verá el cajero
 * • enabled: boolean, por defecto true
 */
export const storePaymentMethodValidator = vine.compile(
  vine.object({
    code: vine
      .string()
      .trim()
      .regex(/^[A-Z0-9_]+$/)
      .toUpperCase(),

    name: vine.string().trim().minLength(2).maxLength(120),

    enabled: vine.boolean().optional(),
  })
)
