import { useState } from "react";
import FormInput from "./FormInput";

export default function LogInForm() {
    const [userLogIn, setUserLogIn] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState(null)

    function handleUsername(e) {
        setUserLogIn({...userLogIn, username: e.target.value})
    }

    function handlePassword(e) {
        setUserLogIn({...userLogIn, password: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        console.log("User data input: ", JSON.stringify(userLogIn))

        fetch("http://localhost:5000/log-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogIn)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error || "Unknown error occured.")
                    })
                }
                return response.json()
            })
            .then(data => {
                // TODO: save tokens to localStorage
                console.log(data)
            })
            .catch(error => {
                console.log("Error during log in: ", error)
                setError(error.message)
            })
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
                        onChange={e => handleUsername(e)}
                    />
                    <FormInput
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                        onChange={e => handlePassword(e)}
                    />
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
        
    )
}