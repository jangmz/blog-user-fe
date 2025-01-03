import { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LogInForm() {
    const auth = useAuth()
    const [userLogIn, setUserLogIn] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    function handleInput(e) {
        const {name, value} = e.target
        setUserLogIn((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(e){
        e.preventDefault()

        if (userLogIn.username === "" || userLogIn.password === "") {
            setError("Please provide both username and password.")
            return
        }

        console.log("User data input: ", JSON.stringify(userLogIn))

        try {
            const success = await auth.logIn(userLogIn)

            if (success) {
                navigate("/")
            } else {
                setError("Invalid username or password.")
            }
        } catch (error) {
            console.log("Error occured during log in: ", error.message)
            setError(error.message)
        }
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