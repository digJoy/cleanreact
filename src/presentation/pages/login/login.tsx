import React, { useEffect, useState } from 'react'
import { Footer, LoginHeader, Input, Status, SubmitButton } from '@/presentation/components'
import Styles from './style.scss'
import Context from '@/presentation/contexts/form/context'
import { Validation } from '@/presentation/protocols/validation'
import { Link } from 'react-router-dom'
import { Authentication, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation | undefined
  authentication: Authentication | undefined
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation!.validate('email', formData)
    const passwordError = validation!.validate('password', formData)
    setState({
      ...state,
      // validar o campo de email com o valor que ta dentro do stado
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState({ ...state, isLoading: true })

      const account = await authentication!.auth({
        email: state.email,
        password: state.password
      })

      await saveAccessToken.save(account.accessToken)
      // history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: (error as Error).message
      })
    }
  }

  return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <Input type="email" name="email" placeholder="email" />
                    <Input type="password" name="password" placeholder="senha" />
                    <SubmitButton />
                    <Link to='/signup' data-testid="signup" className={Styles.link}>Criar conta</Link>
                    <Status />
                </form>
            </Context.Provider>
            <Footer />
        </div>
  )
}

export default Login
