import { Link } from "react-router-dom";

export default function AuthorNavbar() {
    return(
        <ul className="navbar-nav ms-auto d-flex gap-2">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="posts">Blog</Link>
            </li>
            <li className="nav-item">
                <Link to="dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link to="#" className="nav-link">Create article</Link>
            </li>
            <li className="nav-item">
                <Link to="log-out" className="nav-link">Log Out</Link>
            </li>
        </ul>
    )
}