import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { MakeSignUpValidation } from './signup-validation-factory'

describe('SignUpValidationFactory', () => {
  test('Should make validationComponsite with correct validation', () => {
    const componsite = MakeSignUpValidation()
    expect(componsite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().min(5).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().min(5).build()
    ]))
  })
})
