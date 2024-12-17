import FormInput from "./FormInput";

export default function LogInForm() {
    return (
        <div className="container text-center">
            <h1 className="m-4">Log In</h1>
            <div className="container-fluid w-50">
                <form action="http://localhost:5000/log-in" method="POST">
                    <FormInput
                        label={"Username"}
                        name={"username"}
                        type={"text"}
                    />
                    <FormInput
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                    />
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
        
    )
}