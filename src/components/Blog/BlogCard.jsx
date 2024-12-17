function BlogCard({ title, content, created }) {
    const shortContent = content.slice(0,100);

    return (
        <div className="card p-0 m-3 col-xs-11 col-md-5 col-lg-3 col-xl-3">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                </h5>
                <p className="card-text">
                    {shortContent}
                </p>
                <a href="#" className="btn btn-primary">Read</a>
            </div>
            <div className="card-footer text-body-secondary">
                {created}
            </div>
        </div>
    )
}

export default BlogCard;