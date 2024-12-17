import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav id="navbar" className="navbar navbar-expand-md bg-primary">
            <div className="container-fluid">
                <h3 className="navbar-brand">Logo</h3>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav ms-auto d-flex gap-2">
                        <li className="nav-item">
                            <Link className="nav-link" to="posts">Articles</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="log-in" className="nav-link">Log In</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="sign-up" className="nav-link">Sign Up</Link>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>
    )
}

export default Navbar;