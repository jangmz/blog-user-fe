import { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LogInForm() {
    const [userLogIn, setUserLogIn] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState(null)
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
            
            if (auth.error) {
                console.log("Auth Error: ", auth.error)
                setError(auth.error)
            }

            //navigate("/")
            return
        }

        alert("Please provide a valid input!")
    }

    return (
        <div className="container text-center">
            <h1 className="m-4">Log In</h1>
            {
                error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div> 
            }
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