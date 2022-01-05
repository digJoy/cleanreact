import context from '@/presentation/contexts/form/context'
import React, { useContext } from 'react'
import Styles from './style.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props) => {
  const { state, setState } = useContext(context)
  const error = state[`${props.name}Error`]
  const symbol = '•'

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      // manter o estado anterior
      ...state,
      // nome do campo q eu to mexendo: valor dele
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): string => {
    return symbol ? '•' : '•'
  }

  const getTitle = (): string => {
    return error || 'Tudo certo'
  }

  return (
        <div className={Styles.inputWrap}>
            <input
                {...props}
                readOnly
                data-testid={props.name}
                onFocus={enableInput}
                onChange={handleChange}
            />
            <span
                data-testid={`${props.name}-status`}
                className={Styles.status}
                title={getTitle()}
            >
                {getStatus()}
            </span>
        </div>
  )
}

export default Input
