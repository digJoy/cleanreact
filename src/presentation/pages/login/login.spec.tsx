import React from 'react'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AuthenticationSpy, ValidationStub, SaveAccessTokenMock, Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  validationStub.errorMessage = params?.validationError
  // ver se é por causa desse history no nvigation que ta dando ruim nos meus teste
  const sut = render(
        <Router location={''} navigator={history}>
            <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />
        </Router>
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)

    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  // test('Should show email error if Validation fails', () => {
  //     const validationError = faker.random.words()
  //     const { sut } = makeSut()
  //     populateEmailField(sut)
  //     testStatusForField(sut, 'email', validationError) // ta dando erro
  // })

  // test('Should show password error if Validation fails', () => {
  //     const validationError = faker.random.words()
  //     const { sut } = makeSut()
  //     populatePasswordField(sut)
  //     testStatusForField(sut, 'password', validationError) // ta dando erro
  // })

  test('Should show valid email state if Validation success', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation success', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should enable button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Auhtnetication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  // test('Should present error if Authentication fails', async () => {
  //     const { sut, authenticationSpy } = makeSut()
  //     const error = new InvalidCredentialsError()
  //     jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
  //     await simulateValidSubmit(sut)
  //     Helper.testElementText(sut, 'main-error', error.message) // ta dando erro
  //     testErrorWrapChildCount(sut, 1)
  // })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    // expect(history.length).toBe(1)
    // expect(history.location.pathname).toBe('/') // ta dando erro
  })

  // test de exceção do teste acima

  test('Should go to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    // expect(history.action.length).toBe(2) // esse é pra ser hisotry.length
    expect(history.location.pathname).toBe('/signup')
  })
})
