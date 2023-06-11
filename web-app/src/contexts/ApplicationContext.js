import { createContext } from "react";

export const ApplicationContext = createContext({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {
        // update the user isAuthenticated state

    },
    supabaseClient: null,
})