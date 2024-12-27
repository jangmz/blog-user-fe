import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("refreshToken"))
    const [user, setUser] = useState(null) 

    async function logIn(userData) { // username, password
        console.log("Logging user in...")
        
        fetch("http://localhost:5000/log-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error || "Unknown error occured.")
                    })
                }
                return response.json()
            })
            .then(data => {
                console.log("Log in successfull.")
                console.log(data) // refreshToken, accessToken
                
                localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("refreshToken", data.refreshToken)
                
                const { username, role } = jwtDecode(data.refreshToken)
                
                setToken(data.refreshToken) // token assigned
                setUser({ username, role })
            })
            .catch(error => {
                console.log("Error during log in: ", error)
                throw new Error(error.message) // setError in component
            })
    }

    async function logOut() {
        console.log("Logging user out: ", user)
        console.log("Token to be deleted: ", token)

        fetch("http://localhost:5000/log-out", {
            method:"DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token }),
        }).then(response => {
            console.log("Response body: ", response.text())
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || "Unknown error occured")
                })
            }

            localStorage.removeItem("refreshToken")
            localStorage.removeItem("accessToken")

            setToken(null)
            setUser(null)

            console.log("User logged out.")
        }).catch(error => {
            console.error("Error logging out: ", error)
            return error
        })
    }

    return (
        <AuthContext.Provider value={{ user, token, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}