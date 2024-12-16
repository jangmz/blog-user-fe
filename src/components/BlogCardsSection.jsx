import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

function BlogCardsSection() {
    // last 6 posts
    const recentPosts = [
        {
            id: 1,
            title: "Test 1",
            content: "Test content 1",
            created: "12/12/2024"
        },{
            id:2,
            title: "Test 2",
            content: "Test content 2",
            created: "12/12/2024"
        },{
            id: 3,
            title: "Test 3",
            content: "Test content 3",
            created: "12/12/2024"
        },{
            id: 4,
            title: "Test 4",
            content: "Test content 4",
            created: "12/12/2024"
        },{
            id: 5,
            title: "Test 5",
            content: "Test content 5",
            created: "12/12/2024"
        },{
            id: 6,
            title: "Test 6",
            content: "Test content 6",
            created: "12/12/2024"
        }
    ];

    return (
        <div id="blog-cards" className="container-fluid d-flex flex-column align-items-center">
            <h2>Articles</h2>
            <div className="row w-100 justify-content-center">
                {
                    recentPosts.map(post => (
                        <BlogCard 
                            key={post.id}
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

export default BlogCardsSection;