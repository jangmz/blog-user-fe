import { useState } from "react";

export default function BlogArticle({ id }) {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Test 1",
            author: "testAuthor",
            content: "Test content 1",
            created: "12/12/2024"
        },{
            id:2,
            title: "Test 2",
            author: "testAuthor",
            content: "Test content 2",
            created: "12/12/2024"
        },{
            id: 3,
            title: "Test 3",
            author: "testAuthor",
            content: "Test content 3",
            created: "12/12/2024",
            updated: "17/12/2024"
        },{
            id: 4,
            title: "Test 4",
            author: "testAuthor",
            content: "Test content 4",
            created: "12/12/2024"
        },{
            id: 5,
            title: "Test 5",
            author: "testAuthor",
            content: "Test content 5",
            created: "12/12/2024",
            updated: "16/12/2024"
        },{
            id: 6,
            title: "Test 6",
            author: "testAuthor",
            content: "Test content 6",
            created: "12/12/2024"
        }
    ]);

    const currentPost = posts.filter(post => post.id === parseInt(id));

    return (
        <div className="container">
            <h1>{currentPost[0].title}</h1>
            <h5>Author: {currentPost[0].author}</h5>
            <h5>Posted: {currentPost[0].created}</h5>
            {
                currentPost[0].updated !== undefined ? <h5>Updated: {currentPost[0].updated}</h5> : ""
            }
            <p>Post content.</p>
        </div>
    )
}