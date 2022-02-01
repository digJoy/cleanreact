import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  errorMessage!: string | undefined

  validate (fieldName: string, input: object): string {
    return this.errorMessage!
  }
}
