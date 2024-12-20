import BlogCard from "./BlogCard";
import { useBlogContext } from "../../context/BlogContext";

export default function BlogList() {    
    const { posts, loading, error } = useBlogContext();

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <div className="row w-100 justify-content-center">
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

/*const [allPosts, setAllPosts] = useState([
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
    */