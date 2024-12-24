import { Link } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import GeneralNavbar from "./GeneralNavbar";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { user } = useAuth();

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken); // user object
            username = decodedToken.username; // Adjust based on your token structure
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    return (
        <nav id="navbar" className="navbar navbar-expand-md bg-primary">
            <div className="container-fluid">
                <Link to="/">
                    <h3 className="navbar-brand">Logo</h3>
                </Link>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    {user ? <UserNavbar /> : <GeneralNavbar />}
                </div>
                
            </div>
        </nav>
    )
}

export default Navbar;