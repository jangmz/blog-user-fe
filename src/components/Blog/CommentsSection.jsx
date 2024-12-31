import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import Comment from "./Comment"
import CommentInput from "./CommentInput"

export default function CommentsSection({ currentPost }) {
    const [comment, setComment] = useState("")
    const comments = currentPost.comments
    const {user} = useAuth()

    function handleInput(e) {
        setComment(prev => prev = e.target.value)
    }

    /* TODO: Save new comment to DB (currentPost has info) */

    function onCommentSubmit(e) {
        e.preventDefault()

        console.log("Save comment to DB: ", comment)
        console.log("Post information: ", currentPost)
    }

    return (
        <div className="container justify-content-center">
            <h3 className="text-center m-4">Comments</h3>
            {
                user ? 
                <CommentInput 
                    comment={comment}
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