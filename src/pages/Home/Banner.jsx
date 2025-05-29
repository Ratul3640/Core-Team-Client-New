import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://i.ibb.co.com/v3ZF0BJ/bg.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">A new HQ for all of your employee info</h1>
                    <p className="mb-5">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <Link to="/dashboard">
                        <button className="btn border-0 bg-orange-600">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Banner;
