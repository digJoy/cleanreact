import React from "react";
import { Login } from "@/presentation/pages";
import { MakeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { MakeLoginValidation } from "./login-validation-factory";

export const MakeLogin: React.FC = () => {

    return (
        <Login 
            authentication={MakeRemoteAuthentication()} 
            validation={MakeLoginValidation()} 
        />
    )
}