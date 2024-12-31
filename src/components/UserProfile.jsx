import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UserProfile() {
    const [user, setUser] = useState(useAuth.user || null) // useAuth.user is null!!!
    const navigate = useNavigate()

    if (!user) {
        navigate("/log-in")
    }

    function handleInput(e) {
        const { name, value } = e.target
        setUser((prev) => ({...prev, [name]: value}))
    }

    async function handleUpdate(e) {
        e.preventDefault()

        // update new data in DB, context, localstorage
        console.log("New user data: ", user)
    }

    return (
        <div className="container">
            <h1 className="text-center">My profile</h1>
            <form onSubmit={handleUpdate}>
                {/* TODO: use FormInput components & call handleInput() */}
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={user.username}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={user.email} />
                <label htmlFor="role">Role</label>
                <select name="role" id="role" value={user.role}>
                    <option value="USER">User</option>
                    <option value="AUTHOR">Author</option>
                </select>
                {/* TODO: add option to delete account */}
            </form>
        </div>
    )
}

export default UserProfile