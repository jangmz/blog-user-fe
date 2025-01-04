import { createContext, useContext, useEffect, useState } from "react";
import useFetchPosts from "../hooks/useFetchPosts";
import { useAuth } from "./AuthContext";

const BlogContext = createContext();

// custom hook
export function useBlogContext() {
    return useContext(BlogContext);
}

export function BlogProvider({ children }) {
    const { posts, loading, error } = useFetchPosts()
    const { user } = useAuth()
    const [postList, setPostList] = useState(posts)

    useEffect(() => {
        setPostList(posts)
    }, [posts])

    // adding a new comment to the post
    async function addComment(postId, commentData, token) {
        try {
            // DB insertion
            const response = await fetch("http://localhost:5000/comments", {
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

    return (
        <BlogContext.Provider value={{ posts: postList, loading, error, addComment }}>
            {children}
        </BlogContext.Provider>
    )
}