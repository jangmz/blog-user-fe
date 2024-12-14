import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

function BlogCardsSection() {
    const [posts, setPosts] = useState([
        {
            title: "Test 1",
            content: "Test content 1",
            created: "12/12/2024"
        },{
            title: "Test 2",
            content: "Test content 2",
            created: "12/12/2024"
        },{
            title: "Test 3",
            content: "Test content 3",
            created: "12/12/2024"
        },{
            title: "Test 4",
            content: "Test content 4",
            created: "12/12/2024"
        },
    ]);

    return (
        <div className="container-fluid">
            <BlogCard 
                title={title}
                shortContent={shortContent}
                created={created}
            />
        </div>
    )
}

export default BlogCardsSection;