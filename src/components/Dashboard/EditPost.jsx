import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useBlogContext } from "../../context/BlogContext"
import FormInput from "../Forms/FormInput"
import TextAreaInput from "../Forms/TextAreaInput"
import DropdownSelection from "../Forms/DropdownSelection"
import { useAuth } from "../../context/AuthContext"

export default function EditPost() {
    const params = useParams()
    const { posts } = useBlogContext()
    const { user } = useAuth()
    const [post, setPost] = useState(() => {
        const tempPost = posts.filter(post => post.id === parseInt(params.postId))
        return tempPost[0]
    })
    const [error, setError] = useState(null)

    useEffect(() => {
            // check user existance and role
            if (!user || user.role !== "AUTHOR") {
                navigate("/log-in")
            }
        }, [])

    function handleInput(e) {
        const { name, value } = e.target
        setPost(prev => ({ ...prev, [name]: value }))
    }

    function handleUpdate(e) {
        e.preventDefault()
        console.log("Updating post data: ", post)
        // don't forget to add an "updated" value before updating it
        try {
            // TODO: call function to edit the post in BlogContext
        } catch (error) {
            console.error(error.message)
            setError(error.message)
        }
    }

    return (
        <div className="container">
                    <h1 className="text-center m-4">Edit article</h1>
                    {
                        error &&
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    }
                    <div className="container-fluid w-50">
                        <form onSubmit={handleUpdate}>
                            <FormInput 
                                label={"Title"}
                                type={"title"}
                                name={"title"}
                                value={post.title}
                                onChange={e => handleInput(e)}
                            />
                            <TextAreaInput
                                label={"Content"}
                                name={"content"}
                                value={post.content}
                                onChange={(e) => handleInput(e)}
                            />
                            <DropdownSelection 
                                label={"Publish"}
                                name={"published"}
                                selectValue={post.published ? "Yes" : "No"}
                                values={["Yes", "No"]}
                                onChange={(e) => handleInput(e)}
                            />
                            <div className="d-grid mt-3 gap-3">
                                <button className="btn btn-primary" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
    )
}