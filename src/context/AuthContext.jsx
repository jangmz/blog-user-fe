import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("refreshToken") || "")
    const [user, setUser] = useState()

    async function logIn(userData) { // input -> username, password
        console.log("Logging user in...")
        
        fetch("http://localhost:5000/log-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        console.log("Details of error from server: ", errorData.error)
                        throw new Error(errorData.error)
                    })
                }
                return response.json()
            })
            .then(data => {
                console.log("Log in successfull.")
                console.log(data) // refreshToken, accessToken
                const { username, role, email } = jwtDecode(data.refreshToken)
                
                localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("refreshToken", data.refreshToken)
                localStorage.setItem("user", { username, role, email }) // how to save object?
                

                console.log(`User data for context. Username: ${username}, Role: ${role}, E-mail: ${email}`)
                
                setToken(data.refreshToken) // token assigned
                setUser({ username, role, email })
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
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
            localStorage.removeItem("user")

            setToken("")
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

export default AuthProvider

export function useAuth() {
    return useContext(AuthContext)
}