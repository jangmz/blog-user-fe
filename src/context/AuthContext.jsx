import { useState, createContext, useContext } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)

    function logIn(tokenData) {
        setToken(tokenData)
        // add to localStorage
    }

    function logOut() {
        setToken(null)
        // remove from localStorage
    }

    return (
        <AuthContext.Provider value={{ token, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}