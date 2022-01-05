/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createContext } from 'react'

interface IState {
  isLoading: boolean
  email: string
  password: string
  emailError: string
  passwordError: string
  mainError: string
}

interface IContextProps {
  state: IState
  setState: React.Dispatch<React.SetStateAction<{
    isLoading: boolean
    email: string
    password: string
    emailError: string
    passwordError:
    string
    mainError: string
  }>>
}

export default createContext({} as IContextProps)
