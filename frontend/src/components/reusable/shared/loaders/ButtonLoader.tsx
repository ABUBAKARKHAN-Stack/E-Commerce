import { FC } from 'react'
import ShoppingCartLoader from './ShoppingCartLoader'

type Props = {
    size?: string;
    loaderText: string;
    row_reverse?: boolean
}
const ButtonLoader: FC<Props> = ({
    size = 'size-5',
    loaderText,
    row_reverse = false

}) => {
    return (
        <div className={`flex ${row_reverse ? 'flex-row-reverse' : 'flex-row'} items-center gap-x-1.5`}>
            <ShoppingCartLoader
                className={`${size}`}
                isUsingInButton
            />
            <span className="animate-pulse">{loaderText}</span>

        </div>
    )
}

export default ButtonLoader