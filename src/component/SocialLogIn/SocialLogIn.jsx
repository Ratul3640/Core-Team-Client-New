import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import UseAxiosPublic from "../../hook/useAxiosPublic";

const SocialLogIn = () => {

    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic()

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((res) => {
                console.log("Google Sign-In successful:", res.user);

                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    role: "Employee",
                    bank_account_no: "2456146434",
                    salary: "3000",
                    designation: "Social Media executive",
                }

                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        console.log(res.data);
                        // Show success alert
                        Swal.fire({
                            title: "Success!",
                            text: "You have signed in with Google successfully!",
                            icon: "success",
                        }).then(() => {
                            navigate("/", { replace: true }); // Redirect to home page
                        });
                    })
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error.message);
                Swal.fire("Error", error.message, "error"); // Show error alert
            });
    }

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                type="button"
                className="btn w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            >
                <FaGoogle /> Log In With Google
            </button>
        </div>
    );
}

export default SocialLogIn;
