export function validateNumber(value: string | number | undefined): boolean {
  if (value === undefined || value === '') return false
  const num = typeof value === 'string' ? parseFloat(value) : value
  return !isNaN(num) && isFinite(num)
}

export function validateDate(value: string | undefined): boolean {
  if (!value) return false
  const date = new Date(value)
  return !isNaN(date.getTime())
}

export function validateRequired(value: any): boolean {
  if (value === undefined || value === null || value === '') return false
  return true
}

export function validatePositive(value: number): boolean {
  return value > 0
}

export function validateNonNegative(value: number): boolean {
  return value >= 0
}

export function validateRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

export function validateInteger(value: number): boolean {
  return Number.isInteger(value)
}

export type ValidationError = {
  field: string
  message: string
}

export function validateCalculatorInputs(inputs: Record<string, any>, rules: Record<string, (value: any) => boolean>): ValidationError[] {
  const errors: ValidationError[] = []
  
  for (const [field, rule] of Object.entries(rules)) {
    if (!rule(inputs[field])) {
      errors.push({
        field,
        message: `Invalid value for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`
      })
    }
  }
  
  return errors
} 