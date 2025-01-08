import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AllAuthorPosts from "../components/Dashboard/AllAuthorPosts"
import { useAuth } from "../context/AuthContext"
import { useBlogContext } from "../context/BlogContext"

export default function Dashboard() {
    const { user } = useAuth()
    const { posts, deletePost } = useBlogContext()
    const navigate = useNavigate()
    const authorPosts = posts.filter(post => post.authorId === user.id)

    useEffect(() => {
        // check user existance and role
        if (!user || user.role !== "AUTHOR") {
            navigate("/log-in")
        }
    }, [])

    function handleDelete(postId) {
        deletePost(postId)
        navigate("/dashboard")
    }

    function handleEdit(postId) {
        navigate(`/posts/edit/${postId}`)
    }

    return (
        <>
            <div className="container d-flex flex-column align-items-center mt-4">
                <h1 className="mb-4">Author dashboard</h1>
                <AllAuthorPosts authorPosts={authorPosts} handleDelete={handleDelete} handleEdit={handleEdit} />
            </div>
        </>
    )
}