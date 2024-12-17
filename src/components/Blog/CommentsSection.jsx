import { useState } from "react"
import Comment from "./Comment";

/* TODO: for fetched comments from DB, change userId to username */

export default function CommentsSection() {
    const [comments, setComments] = useState([
        {
            id: 1,
            content: "This comment is a test.",
            created: "12/12/2024",
            user: "admin" 
        },{
            id: 2,
            content: "This comment is a test.",
            created: "23/12/2024",
            user: "testUser"
        }
    ]);

    return (
        <div className="container justify-content-center">
            <h3>Comments</h3>
            {
                comments.map(comment => (
                    <Comment 
                        id={comment.id}
                        content={comment.content}
                        created={comment.created}
                        user={comment.user}
                    />
                ))
            }
        </div>
    )
}