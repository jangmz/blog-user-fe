export default function BlogArticle({ post, comments }) {
    return (
        <div className="container">
            <div id="article">
                <h1>{post.title}</h1>
                <p>{post.content}</p>
            </div>
            <div id="comments">
                {
                    comments.map(comment => (
                        <div>
                            <h3>{comment.userId}</h3>
                            <p>{comment.content}</p>
                            <p>Posted: {comment.created}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}