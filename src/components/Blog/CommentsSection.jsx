import Comment from "./Comment"

export default function CommentsSection({ currentPost }) {
    const comments = currentPost.comments

    return (
        <div className="container justify-content-center">
            <h3>Comments</h3>
            {
                comments.length > 0 ? 
                comments.map(comment => (
                    <Comment 
                        key={comment.id}
                        id={comment.id}
                        content={comment.content}
                        created={comment.created}
                        userId={comment.userId}
                    />
                )) :
                <p>There are no comments</p>
            }
        </div>
    )
}