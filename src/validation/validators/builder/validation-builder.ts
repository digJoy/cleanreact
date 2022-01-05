import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]

  ) {}

  // metodo estatico é acessado através da classe então n tem acesso ao this
  // this é um objeto instanciado
  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  // metodos agora são instancias da propria classe ou seja tem que usar assim ValidBuilder.field().required()
  // new ValidationBuilder = ValidatuinBuilder.field()
  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min (length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
