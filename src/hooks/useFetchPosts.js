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

    //useEffect(() => {
        /*if (user) {
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
        }*/
    
        // set endpoints and headers depending on user log-in status
        /*const apiEndpoint = accessToken && user?.role === "AUTHOR" ? `${api_url}/posts/all` : `${api_url}/posts`
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
    }, [accessToken, user, api_url]);*/

    useEffect(() => {
        async function fetchPosts() {
            try {
                let token = accessToken;

                // Check if the token is expired
                if (isTokenExpired(token)) {
                    console.log("Current access token is expired. Refreshing access token...");
                    token = await refreshTokenAndFetchPosts(); // Refresh token
                }

                const apiEndpoint = token && user?.role === "AUTHOR"
                    ? `${api_url}/posts/all`
                    : `${api_url}/posts`;
                const apiHeaders = token ? { "Authorization": `Bearer ${token}` } : {};

                const response = await fetch(apiEndpoint, {
                    method: "GET",
                    headers: apiHeaders,
                });

                if (!response.ok) {
                    throw new Error("Error fetching data from API.");
                }

                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [accessToken, user, api_url]);

    async function refreshTokenAndFetchPosts() {
        try {
            await refreshAccessToken()
            const newAccessToken = localStorage.getItem("accessToken")
            setAccessToken(newAccessToken)
        } catch (error) {
            console.error("Error refreshing token: ", error.message);
        }
    }
    

    return { posts, loading, error };
}