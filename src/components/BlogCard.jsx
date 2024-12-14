function BlogCard({ title, shortContent, created }) {
    return (
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">
                    {title}
                </h5>
                <p class="card-text">
                    {shortContent}
                </p>
                <a href="#" class="btn btn-primary">Read</a>
            </div>
            <div class="card-footer text-body-secondary">
                {created}
            </div>
        </div>
    )
}

export default BlogCard;