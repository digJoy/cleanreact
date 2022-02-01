import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  // @ts-expect-error
  error: Error = null
  constructor (readonly field: string) {}

  validate (input: object): Error {
    return this.error
  }
}
