import React, { memo } from "react"
import Styles from './style.scss';
import Logo from '@/presentation/components/logo/logo'

type Props = React.HTMLAttributes<HTMLElement>

const LoginHeader: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <header className={Styles.header}>
                <Logo />
                <h1>4DEV - Enquetes</h1>
            </header>
        </div>
    )
}

export default memo(LoginHeader)
