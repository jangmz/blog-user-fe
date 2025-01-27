import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext } from "react";
import { isTokenExpired, refreshAccessToken } from "../Utility/token";


const AuthContext = createContext()

function AuthProvider({ children }) {
    const api_url = import.meta.env.VITE_API_URL
    const [token, setToken] = useState(localStorage.getItem("refreshToken") || "")
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "")
    const [user, setUser] = useState()
    const [error, setError] = useState(null)

    async function logIn(userData) { // input -> username, password
        console.log("Logging user in...")

        try {
            const response = await fetch(`${api_url}/log-in`, {
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

            //console.log(`User data for context. ID: ${userDecodedData.id}, Username: ${userDecodedData.username}, Role: ${userDecodedData.role}, E-mail: ${userDecodedData.email}`)
            
            // assigning data to context
            setToken(data.refreshToken)
            setUser(userDecodedData)

            return true
        } catch (error) {
            console.log("Error during log in: ", error.message)
            setError(`Error occured during log in: ${error.message}`)
            return false
        }
    }

    async function logOut() {
        console.log("Logging user out: ", user)
        console.log("Token to be deleted: ", token)

        fetch(`${api_url}/log-out`, {
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
            setError(`Error occured during log out: ${error.message}`)
            alert(error.message)
        })
    }

    async function updateUser(newUserData) {
        let errors = []
        console.log("Updating user data... ", user.id)

        // check token expiration date
        if (isTokenExpired(accessToken)) {
            console.log("Current access token is expired. Refreshing access token...")
            try {
                refreshAccessToken()
                setAccessToken(localStorage.getItem("accessToken"))
                console.log("Access token refreshed successfully.")
            } catch (error) {
                console.log("Error occured: ", error.message)
                setError(error.message)
            }
        }

        try {
            const response = await fetch(`${api_url}/users/${user.id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(newUserData)
            })

            if (!response.ok) {
                return response.json().then(errorData => {
                    // check for an array of errors
                    if (Array.isArray(errorData.errors)) {
                        console.log("multiple errors: ", errorData.errors)
                        errors = errorData.errors
                    } else {
                        console.log("single error: ", errorData)
                        errors.push(errorData.error || "Unknown error occured.")
                    }
                    return errors
                })
            }

            const data = await response.json()
            setUser(prev => ({...prev, username: data.username, email: data.email, role: data.role}))
            console.log("User data updated.")
        } catch (error) {
            console.log(error.message) 
            setError(`Error occured while updating user data: ${error.message}`)
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, error, logIn, logOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export function useAuth() {
    return useContext(AuthContext)
}