import { useState, useEffect } from "react";
import { isTokenExpired, refreshAccessToken } from "../Utility/token";
import { useAuth } from "../context/AuthContext";

export default function useFetchPosts() {
    const api_url = import.meta.env.VITE_API_URL
    const { user } = useAuth()
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // check token expiration
        if (isTokenExpired(accessToken)) {
            console.log("Current access token is expired. Refreshing access token...")
            try {
                refreshAccessToken()
                setAccessToken(localStorage.getItem("accessToken"))
                console.log("Access token refreshed successfully.")
            } catch (error) {
                console.log("Error occured: ", error.message)
            }
        }

        // set endpoints and headers depending on user log-in status
        const apiEndpoint = accessToken && user?.role === "AUTHOR" ? `${api_url}/posts/all` : `${api_url}/posts`
        const apiHeaders = accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}

        fetch(apiEndpoint, {
            method: "GET",
            headers: apiHeaders
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching data from API.")
            }
            return response.json()
        })
        .then(data => {
            //console.log(data)
            setPosts(data)
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }, [accessToken, user, api_url]);

    return { posts, loading, error };
}