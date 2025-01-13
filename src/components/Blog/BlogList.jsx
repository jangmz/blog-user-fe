import BlogCard from "./BlogCard";
import { useBlogContext } from "../../context/BlogContext";

export default function BlogList() {    
    const { posts, loading, error } = useBlogContext();

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <div className="row w-100 justify-content-center">
                {
                    loading &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="alert alert-info text-center" role="alert">
                            Please wait about 1 min for backend to start up as it is hosted on a service that puts application to sleep during periods of inactivity.
                        </div>
                    </div>
                }
                {
                    error &&
                    <div className="alert alert-danger text-center" role="alert">
                        {error.message}
                    </div>
                }
                {
                    Array.isArray(posts) && posts.map(post => (
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