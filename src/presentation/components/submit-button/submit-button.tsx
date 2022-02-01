import context from '@/presentation/contexts/form/context'
import React, { useContext } from 'react'

type Props = {
  title?: string
}

const SubmitButton: React.FC<Props> = ({ title }) => {
  const { state } = useContext(context)

  return (
  <button
    data-testid="submit"
    type="submit"
    disabled={state.isFormInvalid}
  >
    {title! || 'Entrar'}
  </button>
  )
}

export default SubmitButton
