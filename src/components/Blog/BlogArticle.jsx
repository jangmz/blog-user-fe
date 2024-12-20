export default function BlogArticle({ currentPost }) {

    return (
        <div className="container">
            <h1 className="text-center">{currentPost.title}</h1>
            <div className="d-flex flex-column">
                <i>Author: {currentPost.author}</i>
                <i>Posted: {currentPost.created}</i>
                <i>
                    {
                        currentPost.updated ? `Updated: ${currentPost.updated}` : ""
                    }
                </i>
            </div>
            <div className="container bg-light mt-3 p-4" style={{borderRadius: "10px"}}>
                <p>{currentPost.content}</p>
            </div>
        </div>
    )
}