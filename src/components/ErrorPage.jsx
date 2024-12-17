import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <h1>This route doesn't exist.</h1>
            <Link to="/">Go back to homepage</Link>
        </div>
    )
}