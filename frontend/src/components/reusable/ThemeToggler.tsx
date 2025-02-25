import { useThemeContext } from '@/context/themeContext'
import { Sun, MoonIcon } from 'lucide-react'
import { Button } from '../ui/button'

const ThemeToggler = () => {
    const { theme,toggleTheme } = useThemeContext()
    const handleTheme = () => {
        toggleTheme()
    }

    return (
        <Button title={`Switch To ${theme === "dark" ? "Light" : "Dark"} Mode`} variant={"default"} size="sm" onClick={handleTheme} className=' hover:scale-90 duration-200 ease-linear text-white fixed -left-1  xsm:top-3/4 top-[85%]  rounded-r-full'>
            <Sun className='rotate-0 scale-100 dark:scale-0 transition-all dark:-rotate-90 ' />
            <MoonIcon className=' absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </Button>
    )
}

export default ThemeToggler