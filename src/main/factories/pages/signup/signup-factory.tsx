import React from 'react'
import { SignUp } from '@/presentation/pages'
import { MakeSignUpValidation } from './signup-validation-factory'
import { MakeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/save-access-token-factory'
import { MakeRemoteAddAccount } from '../../usecases/add-account/remote-add-acount-factory'

export const MakeSignUp: React.FC = () => {
  return (
        <SignUp
            addAccount={MakeRemoteAddAccount()}
            validation={MakeSignUpValidation()}
            saveAccessToken={MakeLocalSaveAccessToken()}
        />
  )
}
