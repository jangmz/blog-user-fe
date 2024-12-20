export default function Comment({ id, content, created, user, userRole }) {
    // TODO: find user for userId to be displayed as author of the comment

    return (
        <div className="card mb-3">
            <div className="card-header">
                {
                    userRole === "AUTHOR" ? 
                    <strong>{user}</strong> : <i>{user}</i>
                }
            </div>
            <div className="body">
                <p className="card-text p-3">
                    {content}
                </p>
            </div>
            <div className="card-footer text-muted">
                Posted: {created}
            </div>
        </div>
    )
}