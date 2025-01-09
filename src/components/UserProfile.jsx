import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormInput from "./Forms/FormInput";
import DropdownSelection from "./Forms/DropdownSelection";
import { isTokenExpired, refreshAccessToken } from "../Utility/token";

function UserProfile() {
    const {user, authError, logOut, updateUser } = useAuth()
    const [userData, setUserData] = useState(user || null)
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null)
    const [error, setError] = useState(null)
    const [validErrors, setValidErrors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!userData) {
            console.log("User is not logged in. Redirecting to log in form.")
            navigate("/log-in")
        }
    },[navigate, user])

    function handleInput(e) {
        const { name, value } = e.target
        setUserData((prev) => ({...prev, [name]: value}))
    }

    async function handleUpdate(e) {
        e.preventDefault()
        console.log("New user data: ", userData)
        // check for validation errors (like on signup)

        const responseData = updateUser(userData)

        // check if response data is array (means there are errors)
        if (Array.isArray(responseData)) {
            setValidErrors(responseData)
        } else {
            setUserData(responseData)
        }
    }

    function deleteAccount() {
        console.log("User will be deleted: ", user)

        // check token expiration
        if (isTokenExpired(accessToken)) {
            console.log("Current access token is expired. Refreshing access token...")
            try {
                refreshAccessToken()
                setAccessToken(localStorage.getItem("accessToken"))

                console.log("Access token refreshed successfully.")
            } catch (error) {
                console.log("Error occured: ", error.message)
                setError(error.message)
            }
        }

        console.log("Deleting user...")

        // delete user in DB
        fetch(`http://localhost:5000/users/${user.id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${accessToken}`}
        })

        // log user out and redirect
        logOut()
        navigate("/")

        console.log("User deleted successfully.")
    }

    if (!user) {
        return null
    }

    return (
        <div className="container">
            <h1 className="text-center m-4">My profile</h1>
            {
                error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            }
            {
                authError &&
                <div className="alert alert-danger" role="alert">
                    {authError}
                </div>
            }
            {
                validErrors.length > 0 &&
                <div className="alert alert-danger" role="alert">
                    <ul className="mb-0">
                        {validErrors.map((error, index) => (
                            <li key={index}>{error.msg}</li>
                        ))}
                    </ul>
                </div>
            }
            <div className="container-fluid w-50">
                <form onSubmit={handleUpdate}>
                    <FormInput 
                        label={"Username"}
                        type={"text"}
                        name={"username"}
                        value={userData.username}
                        onChange={e => handleInput(e)}
                    />
                    <FormInput 
                        label={"E-mail"}
                        type={"email"}
                        name={"email"}
                        value={userData.email}
                        onChange={e => handleInput(e)}
                    />
                    <DropdownSelection 
                        label={"Role"}
                        name={"role"}
                        selectValue={userData.role}
                        values={["USER", "AUTHOR"]}
                        onChange={e => handleInput(e)}
                    />
                    <div className="d-grid mt-3 gap-3">
                        <button className="btn btn-primary" type="submit">Update data</button>
                        <button className="btn btn-danger" onClick={deleteAccount}>Delete account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfile