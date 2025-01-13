import BlogCard from "./BlogCard";
import { useBlogContext } from "../../context/BlogContext";

export default function BlogList() {    
    const { posts, loading, error } = useBlogContext();

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <div className="row w-100 justify-content-center">
                {
                    loading &&
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className="spinner-border m-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="alert alert-info text-center" role="alert">
                            <p className="m-0">
                                Please wait about 1 min for backend to start up as it is hosted on a service that puts application to sleep during periods of inactivity.
                            </p>
                            <p className="m-0">
                                After posts are loaded, everything will work normally.
                            </p>
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