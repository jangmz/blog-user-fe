import BlogCard from "./BlogCard";
import { useBlogContext } from "../../context/BlogContext";

export default function RecentBlogList() {    
    const { posts, loading, error } = useBlogContext();
    const recentPosts = posts.slice(0,6)

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h2 className="mt-4">Recent posts</h2>
            <div className="row w-100 justify-content-center">
                {
                    Array.isArray(recentPosts) && recentPosts.map(post => (
                        <BlogCard 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            created={post.created}
                        />
                    ))
                }
            </div>
        </div>
    )
}