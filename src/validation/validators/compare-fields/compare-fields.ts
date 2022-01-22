
import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

// composite do tipo validation com todos os filhos com esse formato
export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly valueToCompare: string) {}

  validate (value: string): Error {
    return value !== this.valueToCompare ? new InvalidFieldError() : null as any
  }
}
