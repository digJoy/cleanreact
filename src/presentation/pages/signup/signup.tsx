import React, { useEffect, useState } from 'react'
import { Footer, LoginHeader, Input, Status, SubmitButton } from '@/presentation/components'
import Styles from './style.scss'
import Context from '@/presentation/contexts/form/context'
import { Link } from 'react-router-dom'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation | undefined
  addAccount: AddAccount | undefined
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }) => {
  // const history = useHistory() - é do react router dom mas não funciona
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation!.validate('name', formData)
    const emailError = validation!.validate('email', formData)
    const passwordError = validation!.validate('password', formData)
    const passwordConfirmationError = validation!.validate('password', formData)

    setState({
      ...state,
      // validar o campo de email com o valor que ta dentro do stado
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmationError])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState({ ...state, isLoading: true })
      const account = await addAccount?.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account!.accessToken)
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
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
                    <h2>Criar conta</h2>
                    <Input type="text" name="name" placeholder="nome" />
                    <Input type="email" name="email" placeholder="email" />
                    <Input type="password" name="password" placeholder="senha" />
                    <Input type="password" name="passwordConfirmation" placeholder="confirme a senha" />
                    <SubmitButton title="Cadastrar" />
                    <Link replace to='/login' data-testid="login-link" className={Styles.link}>Voltar para o login</Link>
                    <Status />
                </form>
            </Context.Provider>
            <Footer />
        </div>
  )
}

export default SignUp
