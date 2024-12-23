import { Link } from "react-router-dom";

export default function UserNavbar() {
    return(
        <ul className="navbar-nav ms-auto d-flex gap-2">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="posts">Blog</Link>
            </li>
            <li className="nav-item">
                <Link to="log-out" className="nav-link">Log Out</Link>
            </li>
        </ul>
    )
}