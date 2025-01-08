import bannerImage from "../assets/banner-img2.jpg"

function Banner() {
    return (
        <div id="banner" className="container-fluid d-flex align-items-center bg-light p-0" style={{height: "auto", overflow:"hidden"}}>
            <div className="row w-100 m-0">
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                    <h1>Welcome</h1>
                    <h5>TO BEST TECH BLOG</h5>
                    <i>by Jan</i>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center p-0">
                    <img src={bannerImage} alt="Banner image" className="banner-image w-100 h-auto" />
                </div>
            </div>
        </div>
    )
}

export default Banner;