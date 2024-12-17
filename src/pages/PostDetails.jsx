import { useParams } from "react-router-dom";
import BlogArticle from "../components/Blog/BlogArticle";
import CommentsSection from "../components/Blog/CommentsSection";

export default function PostDetails() {
    const params = useParams();
    const id = params.postId;

    return (
        <div className="container-fluid d-flex flex-column align-items-center mt-4">
            <BlogArticle  
                id={id}
            />
            <CommentsSection />
        </div>
    )
}