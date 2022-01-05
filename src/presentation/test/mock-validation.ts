import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  errorMessage!: string | undefined

  validate (): string {
    return this.errorMessage!
  }
}
