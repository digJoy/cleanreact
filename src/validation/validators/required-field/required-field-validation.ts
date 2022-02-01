import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/errors'

// composite do tipo validation com todos os filhos com esse formato
export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    // @ts-expect-error
    return input[this.field] ? null : new RequiredFieldError()
  }
}
