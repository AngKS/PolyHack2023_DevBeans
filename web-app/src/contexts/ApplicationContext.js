import { createContext } from "react";

export const ApplicationContext = createContext({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    supabaseClient: null,
})