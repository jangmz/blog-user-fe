import { useState } from "react";
import FormInput from "./FormInput";

export default function LogInForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);

        setPassword("");
        setUsername("");
    }

    return (
        <div className="container text-center">
            <h1 className="m-4">Log In</h1>
            <div className="container-fluid w-50">
                <form onSubmit={handleSubmit} action="http://localhost:5000/log-in" method="POST">
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