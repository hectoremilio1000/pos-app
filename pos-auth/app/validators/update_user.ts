import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().optional(),
    email: vine.string().trim().email().optional(),
    password: vine.string().minLength(6).optional(),
  })
)
