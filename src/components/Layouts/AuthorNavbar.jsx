import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthorNavbar() {
    const { logOut } = useAuth()
    const navigate = useNavigate()

    function logOutAndRedirect() {
        logOut()
        navigate("/log-in")
    }

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
                <Link to="#" className="nav-link">Create article (unactive)</Link>
            </li>
            <li className="nav-item">
                <button className="nav-link" onClick={logOutAndRedirect}>Log Out</button>
            </li>
        </ul>
    )
}