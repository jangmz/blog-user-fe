import { Link } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import GeneralNavbar from "./GeneralNavbar";
import AuthorNavbar from "./AuthorNavbar";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.svg"

function Navbar() {
    const { user } = useAuth();

    function renderMenu() {
        switch (user.role) {
            case "USER":
                return <UserNavbar />
            case "AUTHOR":
                return <AuthorNavbar />
        }
    }

    return (
        <nav id="navbar" className="navbar navbar-expand-md bg-primary">
            <div className="container-fluid">
                <Link to="/">
                    {/*
                        <h3 className="navbar-brand d-flex justify-content-center m-0">
                            <img src={Logo} alt="logo" style={{ height: "30px", width:"auto"}}/>
                        </h3>
                    */}
                    {
                        user 
                        ? <h3 className="navbar-brand d-flex justify-content-center m-0">Hi, {user.username}</h3>
                        : <h3 className="navbar-brand d-flex justify-content-center m-0">Blog</h3>
                    }
                </Link>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    {/*user ? <UserNavbar /> : <GeneralNavbar />*/}
                    { user ? renderMenu() : <GeneralNavbar />}
                </div>
                
            </div>
        </nav>
    )
}

export default Navbar;