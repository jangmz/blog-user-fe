import { useState } from "react"
import Comment from "./Comment"
import CommentInput from "./CommentInput"
import { isTokenExpired, refreshAccessToken } from "../../Utility/token"
import { useAuth } from "../../context/AuthContext"
import { useBlogContext } from "../../context/BlogContext"

export default function CommentsSection({ currentPost, updateCurrentPost }) {
    const [commentData, setCommentData] = useState({
        content: "",
        postId: currentPost.id
    })
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const { user } = useAuth()
    const { addComment } = useBlogContext()

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
                console.log("Failed to refresh token. Please log in again.")
                setError("Failed to refresh token. Please log in again.")
                return
            }
        }

        try {
            // add comment to DB and context
            await addComment(currentPost.id, commentData, accessToken)
            console.log("Current post comments after insertion: ", currentPost.comments)
            setSuccess(true)
            setCommentData(prev => ({ ...prev, content: "" })) // clearing the input field
        } catch (error) {
            console.log("Error occured: ", error.message)
            setError("Failed to add comment. Please try again.")
        }
    }

    return (
        <div className="container justify-content-center">
            <h3 className="text-center m-4">Comments</h3>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {success && <div className="alert alert-success" role="alert">Comment posted.</div>}
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
                currentPost.comments.length > 0 ? 
                currentPost.comments.map(comment => (
                    <Comment 
                        key={comment.id}
                        id={comment.id}
                        content={comment.content}
                        created={comment.created}
                        user={comment.user.username}
                        userRole={comment.user.role}
                    />
                )) :
                <div className="alert alert-info text-center" role="alert">There are no comments.</div>
            }
        </div>
    )
}