import { useEffect, useState } from "react"

const useDebounce = (value: string, timeout: number) => {
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");

    useEffect(() => {
        let timeoutRef = setTimeout(() => setDebouncedSearch(value), timeout);
        return () => clearTimeout(timeoutRef);
    }, [value, timeout])

    return debouncedSearch;
}

export {
    useDebounce,
}