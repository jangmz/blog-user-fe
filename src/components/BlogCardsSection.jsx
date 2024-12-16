import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

function BlogCardsSection() {
    // last 6 posts
    const [posts, setPosts] = useState([
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
    ]);

    /*useEffect(() =>{
        fetch("http://localhost:5000/posts")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log(data)
                setPosts(data);
            })
            .catch((error) => {
                console.error(`Error fetching API: ${error.message}`);
            })
    }, [])*/

    return (
        <div id="blog-cards" className="container-fluid d-flex flex-column align-items-center mt-4">
            <h2>Recent articles</h2>
            <div className="row w-100 justify-content-center">
                {
                    posts.map(post => (
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