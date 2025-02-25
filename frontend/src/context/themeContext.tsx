import { createContext, useCallback, useContext, useEffect, useState } from "react";


const ThemeContext = createContext({
    theme: "dark",
    toggleTheme: () => { }
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState("dark")

    const toggleTheme = useCallback(() => {
        const newTheme = theme === "dark" ? "light" : "dark"
        document.querySelector("html")?.classList.remove(theme)
        document.querySelector("html")?.classList.add(newTheme)
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }, [theme])
    
    useEffect(() => {
        document.querySelector("html")?.classList.remove(theme)
        const localTheme = localStorage.getItem("theme")
        if (localTheme) {
            console.log(localTheme);   
            setTheme(localTheme)
            document.querySelector("html")?.classList.add(localTheme)
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

const useThemeContext = () => {
    const context = useContext(ThemeContext)
    return context
}

export { ThemeProvider, useThemeContext }