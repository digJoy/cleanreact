
import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

// composite do tipo validation com todos os filhos com esse formato
export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly fieldToCompare: string) {}

  validate (input: object): Error {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null as any
  }
}
