import bannerImage from "../assets/banner-img.jpg"

function Banner() {
    return (
        <div id="banner" className="container-fluid d-flex align-items-center bg-light" style={{height: "500px"}}>
            <div className="row w-100">
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                    <h1>Welcome</h1>
                    <h5>TO BEST TECH BLOG</h5>
                    <i>by Jan</i>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center p-0">
                    <p>image</p>
                    {
                    //<img src={bannerImage} alt="Banner image" className="banner-image" />
                    }
                </div>
            </div>
        </div>
    )
}

export default Banner;