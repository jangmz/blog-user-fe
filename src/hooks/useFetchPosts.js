import { useState, useEffect } from "react";

export default function useFetchPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/posts")
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
    }, []);

    return { posts, loading, error };
}