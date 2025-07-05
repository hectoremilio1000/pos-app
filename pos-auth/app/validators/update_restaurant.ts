import vine from '@vinejs/vine'

export const updateRestaurantValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    legal_name: vine.string().trim().optional(),
    address_line1: vine.string().trim().optional(),
    city: vine.string().trim().optional(),
    state: vine.string().trim().optional(),
    phone: vine.string().trim().optional(),
    email: vine.string().trim().email().optional(),
    timezone: vine.string().trim().optional(),
    currency: vine.string().trim().fixedLength(3).optional(), // fixedLength, no default()
    plan: vine.enum(['free', 'standard', 'pro']).optional(),
    status: vine.enum(['active', 'suspended', 'deleted']).optional(),
  })
)
