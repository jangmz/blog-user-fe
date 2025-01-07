import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AllAuthorPosts from "../components/Dashboard/AllAuthorPosts"
import { useAuth } from "../context/AuthContext"
import { useBlogContext } from "../context/BlogContext"

export default function Dashboard() {
    const { user } = useAuth()
    const { posts } = useBlogContext()
    const navigate = useNavigate()
    const authorPosts = posts.filter(post => post.authorId === user.id)

    useEffect(() => {
        if (!user || user.role !== "AUTHOR") {
            navigate("/log-in")
        }
    }, [])

    return (
        <>
            <div className="container d-flex flex-column align-items-center mt-4">
                <h1 className="mb-4">Author dashboard</h1>
                <AllAuthorPosts authorPosts={authorPosts} />
            </div>
        </>
    )
}