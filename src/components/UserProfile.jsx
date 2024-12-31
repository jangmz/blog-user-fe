import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormInput from "./Forms/FormInput";
import DropdownSelection from "./Forms/DropdownSelection";

function UserProfile() {
    const {user} = useAuth()
    const [userData, setUserData] = useState(user || null)
    
    /* TODO #1: If user isn't logged in redirect the user to log in screen */
    /* TODO #2: Update new data in DB, context, localStorage */
    /* TODO #3: Delete user */

    function handleInput(e) {
        const { name, value } = e.target
        setUserData((prev) => ({...prev, [name]: value}))
    }

    async function handleUpdate(e) {
        e.preventDefault()
        console.log("New user data: ", userData)
    }

    function deleteAccount() {
        console.log("User will be deleted: ", user)
    }

    return (
        <div className="container">
            <h1 className="text-center m-4">My profile</h1>
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
                        <button className="btn btn-primary">Update data</button>
                        <button className="btn btn-danger" onClick={deleteAccount}>Delete account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfile