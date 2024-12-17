import BlogArticle from "../components/Blog/BlogArticle";
import CommentsSection from "../components/Blog/CommentsSection";

export default function PostDetails() {
    return (
        <div className="container-fluid d-flex flex-column align-items-center mt-4">
            <BlogArticle />
            <CommentsSection />
        </div>
    )
}