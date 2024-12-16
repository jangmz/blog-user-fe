import bannerImage from "../assets/banner-img.jpg"

function Banner() {
    return (
        <div id="banner" className="container-fluid d-flex align-items-center" style={{height: "500px"}}>
            <div className="row w-100">
                <div className="col-6 d-flex align-items-center">
                    <h2>Welcome</h2>
                </div>
                <div className="col-6 d-flex align-items-center p-0">
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