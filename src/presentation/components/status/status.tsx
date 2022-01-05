import React, { useContext } from "react"
import Styles from './style.scss'
import Spinner from "../spinner/spinner"
import Context from '@/presentation/contexts/form/context'

type Props = React.HTMLAttributes<HTMLElement>

const Status: React.FC<Props> = (props: Props) => {

    const { state } = useContext(Context)

    return (
        <div data-testid='error-wrap' className={Styles.errorWrap}>
            { state.isLoading && <Spinner className={Styles.spinner} /> }
            { state.mainError && <span className={Styles.error}>{state.mainError}</span> }
        </div>
    )
}

export default Status