import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (()=> T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) {
            return JSON.parse(jsonValue) as T;
        }
        if (typeof initialValue === "function") {
            return (initialValue as () => T)();
        }
        return initialValue as T;
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    },[key, value]);


    return [value, setValue] as [T, typeof setValue];

}
