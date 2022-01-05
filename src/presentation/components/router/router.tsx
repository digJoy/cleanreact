import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Props = {
    makeLogin: React.ReactNode | React.FC
}

const Router: React.FC<Props> = ({makeLogin}) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={makeLogin} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router