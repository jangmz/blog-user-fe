import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function LogOut() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [hasLoggedOut, setHasLoggedOut] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Component renders.")
        if (hasLoggedOut) return // prevents duplicate calls

        const logOut = async () => {
            try {
                setHasLoggedOut(true)

                const token = localStorage.getItem("refreshToken")
                if (!token) {
                    throw new Error ("No refresh token found.")
                }

                const response = await fetch("http://localhost:5000/log-out", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: token }),
                })

                console.log("Response body:", await response.text())

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || "Unknown error occured")
                }

                localStorage.removeItem("refreshToken")
                localStorage.removeItem("accessToken")
            } catch (error) {
                console.error("Error logging out: ", error)
                setError(error)
            } finally {
                setLoading(false)
                navigate("/", { replace: true })
            }
        }

        logOut()

        return () => {
            console.log("Component unmounted.")
        }
    }, [hasLoggedOut, navigate])

    return (
        <div className="container text-center">
            {
                error &&
                <>
                    <div className="alert alert-danger" role="alert">
                        {error.message}
                        <Link to="/">Return home</Link>
                    </div> 
                </>
                
            }
            {
                loading && 
                <div>Loading...</div>
            }
        </div>
    )
}