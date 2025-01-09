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

    // check token expiration
    function checkToken() {
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
    }

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

        // API
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

    // create new post
    async function createPost(newPostData) {
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

        console.log("Creating new post...")

        // changing published to boolean value
        newPostData.published === "No"
            ? newPostData.published = false
            : newPostData.published = true

        // API
        try {
            const response = await fetch(`${api_url}/posts`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(newPostData)
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log("Details of error from the server: ", errorData.error)
                throw new Error(errorData.error)
            }

            // update state
            const newPost = await response.json()
            setPostList(prev => [...prev, newPost])
            console.log("New post created.")
            return "New post has been created successfully."
        } catch (error) {
            console.error("Error occured: ", error.message)
            return "Failed creating post."
        }
    }

    // update post
    async function updatePost(postData) {
        checkToken()

        console.log(`Updating post with ID ${postData.id}...`)

        // changing published to boolean value
        postData.published = postData.published === "No" ? false : true
        postData.updated = new Date()

        try {
            const response = await fetch(`${api_url}/posts/${postData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(postData)
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log("Details of error from the server: ", errorData.error)
                throw new Error(errorData.error)
            }

            const responseData = await response.json()
            setPostList(prev => {
                prev.map(post => {
                    post.id === responseData.updatedPost.id ? responseData.updatedPost : post
                })
            })
        } catch (error) {
            console.error(error.message)
            return new Error(error.message)
        }
    }
    return (
        <BlogContext.Provider value={{ posts: postList, loading, error, addComment, deletePost, createPost, updatePost }}>
            {children}
        </BlogContext.Provider>
    )
}