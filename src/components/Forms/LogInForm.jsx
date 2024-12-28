import { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LogInForm() {
    const [userLogIn, setUserLogIn] = useState({
        username: "",
        password: "",
    })
    const [redirect, setRedirect] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()

    function handleInput(e) {
        const {name, value} = e.target
        setUserLogIn((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(e){
        e.preventDefault()

        if (userLogIn.username !== "" || userLogIn.password !== "") {
            console.log("User data input: ", JSON.stringify(userLogIn))
            auth.logIn(userLogIn)
            setRedirect(true)
            return
        }

        alert("Please provide a valid input!")
    }

    if (redirect) {
        navigate("/")
    }

    return (
        <div className="container text-center">
            <h1 className="m-4">Log In</h1>
            <div className="container-fluid w-50">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label={"Username"}
                        name={"username"}
                        type={"text"}
                        onChange={e => handleInput(e)}
                    />
                    <FormInput
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                        onChange={e => handleInput(e)}
                    />
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
        
    )
}