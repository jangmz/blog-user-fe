import { Link } from "react-router-dom";
import { formatDateEU } from "../../Utility/formatDate";

function BlogCard({ id, title, content, created }) {
    const shortContent = content.slice(0,100);

    return (
        <div className="card p-0 m-3 col-xs-11 col-md-5 col-lg-3 col-xl-3">
            <img src="https://picsum.photos/800/400" className="card-img-top" alt="Random image" />
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                </h5>
                <p className="card-text">
                    {shortContent}
                </p>
                {/* home -> /id ... posts -> /posts/id ??? */}
                <Link to={`/posts/${id}`} className="btn btn-primary">Read</Link>
            </div>
            <div className="card-footer text-body-secondary">
                Posted: {formatDateEU(created)}
            </div>
        </div>
    )
}

export default BlogCard;