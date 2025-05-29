import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogIn from "../../component/SocialLogIn/SocialLogIn";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const user = result.user;

      console.log("User signed in:", user);
      Swal.fire({
        title: "Success!",
        text: "You have signed in successfully!",
        icon: "success",
      }).then(() => {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };



  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn border-0 bg-gradient-to-r from-[#3E007C] via-[#6A0DAD] to-[#9A4DFF] text-white "
              >
                Log In
              </button>
            </div>
            <NavLink to="/signup">
              <label className="label">
                <span className="text-sm">New?</span>
                <span className="label-text-alt link link-hover font-semibold text-blue-500">
                  Sign Up
                </span>
              </label>
            </NavLink>
            <hr />
            <div className="form-control mt-6">
              <SocialLogIn></SocialLogIn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
