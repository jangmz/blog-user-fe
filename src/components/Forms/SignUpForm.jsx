import { useState } from "react";
import { Link } from "react-router-dom"
import DropdownSelection from "./DropdownSelection";
import FormInput from "./FormInput";

export default function SignUpForm() {
    const api_url = import.meta.env.VITE_API_URL
    const [userSignUp, setUserSignUp] = useState({
        username: "",
        password1: "",
        password2: "",
        email: "",
        role: "USER"
    })
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        setUserSignUp(prevState => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        // create a user
        fetch(`${api_url}/users/sign-up`, {
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

                // not working
                setUserSignUp(prev => ({ 
                    ...prev,
                    username: "",
                    password1: "",
                    password2: "",
                    email: "",
                    role: "USER"
                }))
                setSuccess(true)
            })
            .catch(error => {
                console.log("Error during log in: ", error)
            })
    }

    return (
        <div className="container text-center">
            <h1 className="m-4">Sign Up</h1>
            {
                // error alerts are displayed if there are any
                errors.length > 0 && 
                <div className="alert alert-danger" role="alert">
                    <ul className="mb-0">
                        {errors.map((error, index) => (
                            <li key={index}>{error.msg}</li>
                        ))}
                    </ul>
                </div> 
            }
            {
                // success alert is displayed after successful sign up
                success && 
                <div className="alert alert-success" role="alert">
                    <p>You have successfully created an account.</p>
                    <p>You can log in <Link to="/log-in" className="">HERE</Link></p>
                </div>
            }
            <div className="container-fluid w-50">
                <form onSubmit={ handleSubmit }>
                    <FormInput
                        label={"Username"}
                        name={"username"}
                        type={"text"}
                        value={userSignUp.username}
                        onChange={ handleChange }
                    />
                    <FormInput
                        label={"Password"}
                        name={"password1"}
                        type={"password"}
                        value={userSignUp.password1}
                        onChange={ handleChange }
                    />
                    <FormInput
                        label={"Repeat password"}
                        name={"password2"}
                        type={"password"}
                        value={userSignUp.password2}
                        onChange={ handleChange }
                    />
                    <FormInput
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                        value={userSignUp.email}
                        onChange={ handleChange }
                    />
                    <DropdownSelection
                        label={"Role"}
                        name={"role"}
                        values={["USER", "AUTHOR"]}
                        selectValue={userSignUp.role}
                        onChange={ handleChange }
                    />
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
        
    )
}