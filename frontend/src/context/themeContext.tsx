import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ThemeContextTypes = {
    theme: string;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextTypes>({
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
        let firstMounted = true;
        document.querySelector("html")?.classList.remove(theme)
        const localTheme = localStorage.getItem("theme")
        if (localTheme) {
            firstMounted = false;
            console.log(localTheme);
            setTheme(localTheme)
            document.querySelector("html")?.classList.add(localTheme)
        } else {
            localStorage.setItem("theme",theme);
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