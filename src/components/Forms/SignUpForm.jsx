import DropdownSelection from "./DropdownSelection";
import FormInput from "./FormInput";

export default function SignUpForm() {
    return (
        <div className="container text-center">
            <h1 className="m-4">Sign Up</h1>
            <div className="container-fluid w-50">
                <form action="http://localhost:5000/users/sign-up" method="POST">
                    <FormInput
                        label={"Username"}
                        name={"username"}
                        type={"text"}
                    />
                    <FormInput
                        label={"Password"}
                        name={"password1"}
                        type={"password"}
                    />
                    <FormInput
                        label={"Repeat password"}
                        name={"password2"}
                        type={"password"}
                    />
                    <FormInput
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                    />
                    <DropdownSelection
                        label={"Role"}
                        name={"role"}
                        values={["USER", "AUTHOR"]}
                    />
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
        
    )
}