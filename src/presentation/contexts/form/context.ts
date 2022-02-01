/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createContext } from 'react'

interface IState {
  isLoading: boolean
  isFormInvalid: boolean
  name?: string
  email?: string
  password?: string
  nameError?: string
  emailError?: string
  passwordError?: string
  passwordConfirmationError?: string
  mainError?: string
}

interface IContextProps {
  state: IState
  setState: React.Dispatch<React.SetStateAction<any>>
}

export default createContext({} as IContextProps)
