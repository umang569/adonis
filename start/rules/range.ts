import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
import { VineNumber } from '@vinejs/vine'

// Custom range validator function
async function range(value: unknown, options: number[], field: FieldContext) {
  const numValue = typeof value === 'number' ? value : Number.NaN // Type assertion to handle 'unknown' type
  if (Number.isNaN(numValue) || numValue < options[0] || numValue > options[1]) {
    field.report('The number is not in range {{ options[0]}}', 'range', field)
  }
}

// Create the custom rule for range validation
export const inRange = vine.createRule(range)

// Add `inRange` macro to `VineNumber`
VineNumber.macro('inRange', function (this: VineNumber, options: number[]) {
  return this.use(inRange(options)) // Use the `inRange` rule on the number field
})

declare module '@vinejs/vine' {
  interface VineNumber {
    inRange(options: number[]): VineNumber
  }
}
