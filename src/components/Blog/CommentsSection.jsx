import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import Comment from "./Comment"
import CommentInput from "./CommentInput"
import { isTokenExpired, refreshAccessToken } from "../../Utility/token"

{/* TODO: re-fetch all posts and reload the article with the new comment (or add it in state) */}

export default function CommentsSection({ currentPost }) {
    const [commentData, setCommentData] = useState({
        content: "",
        postId: currentPost.id
    })
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const comments = currentPost.comments
    const {user} = useAuth()

    function handleInput(e) {
        setCommentData(prev => ({...prev, content: e.target.value}))
    }

    async function onCommentSubmit(e) {
        e.preventDefault()

        console.log("Save comment to DB: ", commentData)
        console.log("Post information: ", currentPost)

        // check access token expiration
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
            const response = await fetch("http://localhost:5000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(commentData)
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log("Details of error from the server: ", errorData.error)
                throw new Error(errorData.error)
            }

            setSuccess(true)
        } catch (error) {
            console.log("Error occured: ", error.message)
            setError(error.message)
        }
    }

    return (
        <div className="container justify-content-center">
            <h3 className="text-center m-4">Comments</h3>
            {
                error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div> 
            }
            {
                success && 
                <div className="alert alert-success" role="alert">
                    Comment posted.
                </div>
            }
            {
                user ? 
                <CommentInput 
                    comment={commentData}
                    handleInput={handleInput}
                    onCommentSubmit={onCommentSubmit}
                />
                 :
                <div className="alert alert-secondary" role="alert">
                    To comment on this post please <a href="/log-in">LOG IN</a> or <a href="/sign-up">SIGN UP</a>.
                </div>
            }
            {
                comments.length > 0 ? 
                comments.map(comment => (
                    <Comment 
                        key={comment.id}
                        id={comment.id}
                        content={comment.content}
                        created={comment.created}
                        user={comment.user.username}
                        userRole={comment.user.role}
                    />
                )) :
                <p>There are no comments</p>
            }
        </div>
    )
}