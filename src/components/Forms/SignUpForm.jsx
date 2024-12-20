import { useState } from "react";
import DropdownSelection from "./DropdownSelection";
import FormInput from "./FormInput";

export default function SignUpForm() {
    const [userSignUp, setUserSignUp] = useState({
        username: "",
        password1: "",
        password2: "",
        email: "",
        role: "USER"
    })
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState(null)

    function handleChange(e) {
        const { name, value } = e.target
        setUserSignUp(prevState => ({ ...prevState, [name]: value }))
        setErrors([])
        setSuccess(null)
    }

    function handleSubmit(e) {
        e.preventDefault()

        fetch("http://localhost:5000/users/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userSignUp)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        // check for an array of errors
                        if (Array.isArray(errorData.errors)) {
                            console.log("multiple errors: ", errorData.errors)
                            setErrors(errorData.errors)
                        } else {
                            console.log("single error: ", errorData)
                            setErrors([errorData.error || "Unknown error occured."])
                        }
                        throw new Error("Validation error.")
                    })
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                setUserSignUp({ // not working
                    username: "",
                    password1: "",
                    password2: "",
                    email: "",
                    role: "USER"
                })
                setSuccess(data.message)
                // TODO: redirect after 2 seconds
            })
            .catch(error => {
                console.log("Error during log in: ", error)
            })
    }

    return (
        <div className="container text-center">
            <h1 className="m-4">Sign Up</h1>
            {
                errors.length > 0 && 
                <div className="alert alert-danger" role="alert">
                    <ul className="mb-0">
                        {errors.map((error, index) => (
                            <li key={index}>{error.value} - {error.msg}</li>
                        ))}
                    </ul>
                </div> 
            }
            {
                success && 
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            }
            <div className="container-fluid w-50">
                <form onSubmit={ handleSubmit }>
                    <FormInput
                        label={"Username"}
                        name={"username"}
                        type={"text"}
                        onChange={ handleChange }
                    />
                    <FormInput
                        label={"Password"}
                        name={"password1"}
                        type={"password"}
                        onChange={ handleChange }
                    />
                    <FormInput
                        label={"Repeat password"}
                        name={"password2"}
                        type={"password"}
                        onChange={ handleChange }
                    />
                    <FormInput
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                        onChange={ handleChange }
                    />
                    <DropdownSelection
                        label={"Role"}
                        name={"role"}
                        values={["USER", "AUTHOR"]}
                        onChange={ handleChange }
                    />
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
        
    )
}