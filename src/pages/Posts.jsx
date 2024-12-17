import BlogList from "../components/Blog/BlogList";

export default function Post() {
    return (
        <>
            <div className="container-fluid d-flex flex-column align-items-center mt-4">
                <h1>All articles</h1>
                <BlogList />
            </div>
        </>
    )
}