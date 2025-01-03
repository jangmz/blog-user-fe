import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("refreshToken") || "")
    const [user, setUser] = useState()

    async function logIn(userData) { // input -> username, password
        console.log("Logging user in...")

        try {
            const response = await fetch("http://localhost:5000/log-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log("Details of error from the server: ", errorData.error)
                throw new Error(errorData.error)
            }

            const data = await response.json()
            console.log("Log in successfull.")

            // user data
            const { id, username, role, email } = jwtDecode(data.refreshToken)
            const userDecodedData = { id, username, role, email }
            
            // saving data to localStorage
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)

            console.log(`User data for context. ID: ${userDecodedData.id}, Username: ${userDecodedData.username}, Role: ${userDecodedData.role}, E-mail: ${userDecodedData.email}`)
            
            // assigning data to context
            setToken(data.refreshToken)
            setUser(userDecodedData)

            return true
        } catch (error) {
            console.log("Error during log in: ", error.message)
            return false
        }
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

            setToken("")
            setUser(null)

            console.log("User logged out.")
        }).catch(error => {
            console.error("Error logging out: ", error.message)
            alert(error.message)
        })
    }

    return (
        <AuthContext.Provider value={{ user, token, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export function useAuth() {
    return useContext(AuthContext)
}