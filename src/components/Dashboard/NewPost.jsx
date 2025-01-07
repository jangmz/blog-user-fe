import { useState, useEffect } from "react"
import FormInput from "../Forms/FormInput"
import DropDownSelection from "../Forms/DropdownSelection"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useBlogContext } from "../../context/BlogContext"

export default function NewPost() {
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        published: "No"
    })
    const { user } = useAuth()
    const { createPost } = useBlogContext()
    const navigate = useNavigate()

    useEffect(() => {
            // check user existance and role
            if (!user || user.role !== "AUTHOR") {
                navigate("/log-in")
            }
        }, [])

    function handleInput(e) {
        const { name, value } = e.target
        setNewPost(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log("Submit new post: ", newPost)
        createPost(newPost)
        navigate("/dashboard")
    }

    return (
        <>
        <div className="container mt-4">
            <h1 className="text-center m-4">New article</h1>
            <div className="container-fluid w-50">
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        label={"Title"}
                        name={"title"}
                        type={"text"}
                        value={newPost.title}
                        onChange={(e) => handleInput(e)}
                    />
                    <FormInput 
                        label={"Content"}
                        name={"content"}
                        type={"text"}
                        value={newPost.content}
                        onChange={(e) => handleInput(e)}
                    />
                    <DropDownSelection 
                        label={"Publish"}
                        name={"published"}
                        selectValue={newPost.published}
                        values={["Yes", "No"]}
                        onChange={(e) => handleInput(e)}
                    />
                    <div className="d-grid mt-3 gap-3">
                        <button type="submit" className="btn btn-primary">Create New Article</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}