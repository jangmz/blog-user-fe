import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserNavbar() {
    const auth = useAuth()

    return(
        <ul className="navbar-nav ms-auto d-flex gap-2">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="posts">Blog</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="profile">Profile(not available)</Link>
            </li>
            <li className="nav-item">
                <button className="nav-link" onClick={auth.logOut}>Log Out</button>

            </li>
        </ul>
    )
}