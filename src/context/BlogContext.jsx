import { createContext, useContext, useEffect, useState } from "react";
import useFetchPosts from "../hooks/useFetchPosts";

const BlogContext = createContext();

export function BlogProvider({ children }) {
    const { posts, loading, error } = useFetchPosts();
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        if (posts) {
            setAllPosts(posts);
        }
    }, [posts]);

    return (
        <BlogContext.Provider value={{ allPosts, loading, error }}>
            {children}
        </BlogContext.Provider>
    )
}

export function useBlogContext() {
    useContext(BlogContext);
}