import vine from '@vinejs/vine'

export const storeRestaurantValidator = vine.compile(
  vine.object({
    slug: vine
      .string()
      .trim()
      .regex(/^[a-z0-9-]+$/),
    name: vine.string().trim(),
    legal_name: vine.string().trim().optional(),
    address_line1: vine.string().trim().optional(),
    city: vine.string().trim().optional(),
    state: vine.string().trim().optional(),
    phone: vine.string().trim().optional(),
    email: vine.string().trim().email().optional(),
    timezone: vine
      .string()
      .trim()
      .optional()
      .transform((val) => val ?? 'America/Mexico_City'),
    currency: vine
      .string()
      .trim()
      .fixedLength(3)
      .optional()
      .transform((val) => val ?? 'MXN'),

    plan: vine
      .enum(['free', 'standard', 'pro'])
      .optional()
      .transform((val) => val ?? 'free'),
    status: vine
      .enum(['active', 'suspended'])
      .optional()
      .transform((val) => val ?? 'active'),
  })
)
