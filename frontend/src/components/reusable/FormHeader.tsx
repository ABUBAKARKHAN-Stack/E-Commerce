import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Button } from '../ui/button'
import { FC } from 'react'

const FormHeader: FC = () => {
    return (

        <div className="flex items-center justify-between mb-6 w-full max-w-full xs:max-w-[95%]">
            <Logo width='w-32 sm:w-40 md:w-48' />
            <Link to="/">
                <Button
                    className='text-[10px] bg-cyan-500 hover:bg-cyan-600/90 transition-all ease-linear duration-300 hover:scale-105 rounded-full xxs:text-xs xsm:text-sm xsm:py-5 hover:underline'
                    variant="default"
                >
                    Back to Home
                </Button>
            </Link>
        </div>
    )
}

export default FormHeader