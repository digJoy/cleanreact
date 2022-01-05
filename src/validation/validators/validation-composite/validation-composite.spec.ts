import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any'),
    new FieldValidationSpy('any')
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)

  return { sut, fieldValidationsSpy }
}

describe('CompositeValidation', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut()
    fieldValidationsSpy[0].error = new Error('first_error')
    fieldValidationsSpy[1].error = new Error('second_error')

    const error = sut.validate('any', 'any_value')
    expect(error).toBe('first_error')
  })

  test('Should return no errors', () => {
    const { sut } = makeSut()
    const error = sut.validate('any', 'any_value')
    expect(error).toBeFalsy()
  })
})
