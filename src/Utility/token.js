import { jwtDecode } from "jwt-decode"

export function isTokenExpired(token) {
    // no token = expired
    if (!token) return true 

    const { exp } = jwtDecode(token)
    const currentTime = Date.now() / 1000 // current time in seconds

    return exp < currentTime // compare expiry time with current
}

export async function refreshAccessToken() {
    const token = localStorage.getItem("refreshToken")

    if (!token) {
        throw new Error("No refresh token available")
    }

    try {
        const response = await fetch("http://localhost:5000/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            throw new Error("Error retrieving new token.")
        }

        const data = await response.json()
        localStorage.setItem("accessToken", data.accessToken)
    } catch (error) {
        console.error("Failed to refresh access token:", error.message)
        throw error // Rethrow the error so the calling code can handle it
    }
}

export function checkAndUpdateToken(token) {
    if (isTokenExpired(token)) {
        console.log("Current access token is expired. Refreshing access token...")
        try {
            refreshAccessToken()
            console.log("Access token refreshed successfully.")
        } catch (error) {
            console.log("Error occured: ", error.message)
            return localStorage.getItem("accessToken")
        }
    }
    return localStorage.getItem("accessToken")
}