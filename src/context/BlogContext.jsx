import { createContext, useContext, useEffect, useState } from "react";
import useFetchPosts from "../hooks/useFetchPosts";

const BlogContext = createContext();

// custom hook
export function useBlogContext() {
    return useContext(BlogContext);
}

export function BlogProvider({ children }) {
    const { posts, loading, error } = useFetchPosts();

    return (
        <BlogContext.Provider value={{ posts, loading, error }}>
            {children}
        </BlogContext.Provider>
    )
}