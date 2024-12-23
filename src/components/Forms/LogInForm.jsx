import { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

export default function LogInForm() {
    const [userLogIn, setUserLogIn] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()

    function handleUsername(e) {
        setUserLogIn({...userLogIn, username: e.target.value})
    }

    function handlePassword(e) {
        setUserLogIn({...userLogIn, password: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        //setLoading(true)
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
                console.log("Log in successfull.")
                localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("refreshToken", data.refreshToken)
                console.log(data)
            })
            .catch(error => {
                console.log("Error during log in: ", error)
                setError(error.message)
            })
            .finally(() => {
                navigate("/")
            })
    }

    if (loading) {
        return (
            <div className="container text-center">
                <div>Loading ...</div>
            </div>
        )
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