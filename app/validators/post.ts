import vine from '@vinejs/vine'

export const postValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(7),
    age: vine.number().min(18).max(100),
  })
)
