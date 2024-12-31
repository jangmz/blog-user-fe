import FormInput from "../Forms/FormInput"

function CommentInput({ comment, handleInput, onCommentSubmit}) {
    return (
        <div className="card bg-light mb-3">
            <div className="card-body">
                <form onSubmit={onCommentSubmit}>
                    <FormInput 
                        label={"New comment"}
                        name={"comment"}
                        type={"text"}
                        value={comment}
                        onChange={(e) => handleInput(e)}
                    />
                    <button type="submit" className="btn btn-primary">Post</button>
                </form>
            </div>
        </div>
    )
}

export default CommentInput