import { Link } from "react-router-dom";

export default function GeneralNavbar() {
    return(
        <ul className="navbar-nav ms-auto d-flex gap-2">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="posts">Blog</Link>
            </li>
            <li className="nav-item">
                <Link to="log-in" className="nav-link">Log In</Link>
            </li>
            <li className="nav-item">
                <Link to="sign-up" className="nav-link">Sign Up</Link>
            </li>
        </ul>
    )
}