import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { EmailValidation } from './email-validation'
import * as faker from 'faker'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Shoul return falsy if email is valid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })

  test('Shoul return falsy if email is empty', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
