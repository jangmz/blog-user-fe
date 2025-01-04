import { useParams } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext";
import BlogArticle from "../components/Blog/BlogArticle";
import CommentsSection from "../components/Blog/CommentsSection";
import { useEffect, useState } from "react";

export default function PostDetails() {
    const params = useParams();
    const id = params.postId;
    const { posts } = useBlogContext()
    const [currentPost, setCurrentPost] = useState(() => {
        return posts.find(post => post.id === Number(id))
    })

    useEffect(() => {
        const updatedPost = posts.find(post => post.id === Number(id));
        if (updatedPost) {
            setCurrentPost(updatedPost);
        }
    }, [posts, id])

    if (!currentPost) {
        throw new Error("Post not found.")
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center mt-4">
            <BlogArticle currentPost={currentPost}/>
            <CommentsSection currentPost={currentPost}/>
        </div>
    )
}