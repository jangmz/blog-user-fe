export default function Comment({ id, content, created, user }) {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <i>{user}</i> said
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