import vine from '@vinejs/vine'

export const postValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine.string().email(),
    password: vine.string().minLength(7),
    age: vine.number().min(18).max(100).optional(),
  })
)
