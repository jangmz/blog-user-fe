import { createContext, useContext, useEffect, useState } from "react";
import useFetchPosts from "../hooks/useFetchPosts";
import { useAuth } from "./AuthContext";
import { isTokenExpired, refreshAccessToken } from "../Utility/token";

const BlogContext = createContext();

// custom hook
export function useBlogContext() {
    return useContext(BlogContext);
}

export function BlogProvider({ children }) {
    const api_url = import.meta.env.VITE_API_URL
    const { posts, loading, error } = useFetchPosts()
    const { user } = useAuth()
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null)
    const [postList, setPostList] = useState(posts)

    useEffect(() => {
        setPostList(posts)
    }, [posts])

    // adding a new comment to the post
    async function addComment(postId, commentData, token) {
        try {
            // DB insertion
            const response = await fetch(`${api_url}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(commentData)
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log("Details of error from the server: ", errorData.error)
                throw new Error(errorData.error)
            }

            const { comment: newComment } = await response.json()
            newComment.user = user

            console.log("New Comment from BE: ", newComment)

            // update the post in state with the new comment
            setPostList(prevPosts => {
                const updatedPosts = prevPosts.map(post =>
                    post.id === postId ?
                        { ...post, comments: [...post.comments, newComment] } : post
                )
                console.log("Updated posts: ", updatedPosts)
                return updatedPosts
            })


        } catch (error) {
            console.error("Error adding comment: ", error.message)
            throw error
        }
    }

    // delete post
    async function deletePost(postId) {
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

        console.log("Deleting post with ID: ", postId)

        // hitting API
        try {
            const response = await fetch(`${api_url}/posts/${postId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${accessToken}` }
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log("Details of error from the server: ", errorData.error)
                throw new Error(errorData.error)
            }

            // update state
            const updatedPosts = postList.filter(post => post.id !== postId)
            setPostList(updatedPosts)
        } catch (error) {
            console.error("Error occured: ", error.message)
        }

        console.log("Post deleted.")
    }

    return (
        <BlogContext.Provider value={{ posts: postList, loading, error, addComment, deletePost }}>
            {children}
        </BlogContext.Provider>
    )
}