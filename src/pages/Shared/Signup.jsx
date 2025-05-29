import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogIn from "../../component/SocialLogIn/SocialLogIn";

const Signup = () => {
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const imgbbAPIKey = "4b1ab40c84363ea80473bd98398b4614"; // Replace with your actual API key

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        return data.data.url; // Return the image URL
      } else {
        Swal.fire("Error", "Image upload failed. Please try again.", "error");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("Error", "An error occurred during image upload.", "error");
      return null;
    }
  };

  const onSubmit = async (data) => {
    if (!photo) {
      Swal.fire("Warning", "Please upload a profile photo.", "warning");
      return;
    }

    try {
      // Create user in Firebase
      const user = await createUser(data.email, data.password);
      console.log(user);

      // Update Firebase user profile
      await updateUserProfile(data.name, photo);
      console.log("User profile updated");

      // Prepare data to send to the server
      const userData = {
        name: data.name,
        email: data.email,
        role: data.role,
        bank_account_no: data.bank_account_no,
        salary: data.salary,
        designation: data.designation,
        photo: photo,
      };

      // Save user data to the server
      const response = await fetch("https://core-team-server.vercel.app/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        reset();
        Swal.fire({
          title: "Success!",
          text: "Account created successfully!",
          icon: "success",
        }).then(() => {
          navigate("/"); // Redirect to home
        });
      } else {
        const errorData = await response.json();
        console.error("Error saving user data:", errorData);
        Swal.fire("Error", "Failed to save user data. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Swal.fire("Error", "Failed to create account. Please try again.", "error");
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        setPhoto(imageUrl);
      }
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>

            {/* Role Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                {...register("role", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select a role</option>
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
              </select>
              {errors.role && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>

            {/* Bank Account Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bank Account No</span>
              </label>
              <input
                {...register("bank_account_no", { required: true })}
                type="text"
                placeholder="Bank Account Number"
                className="input input-bordered"
              />
              {errors.bank_account_no && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>

            {/* Salary Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Salary</span>
              </label>
              <input
                {...register("salary", { required: true })}
                type="number"
                placeholder="Salary"
                className="input input-bordered"
              />
              {errors.salary && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>

            {/* Designation Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Designation</span>
              </label>
              <input
                {...register("designation", { required: true })}
                type="text"
                placeholder="Designation"
                className="input input-bordered"
              />
              {errors.designation && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>

            {/* Photo Upload Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered"
              />
              {photo && (
                <p className="text-green-500 mt-2">Photo uploaded successfully!</p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 14,
                  pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                })}
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              
              {errors.password?.type === "required" && (
                <p className="text-red-400">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-400">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-400">
                  Password must not exceed 14 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-400">
                  Password must include one uppercase,one lowercase,one number, and one special
                  character
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn border-0 bg-gradient-to-r from-[#3E007C] via-[#6A0DAD] to-[#9A4DFF] text-white">
                Sign Up
              </button>
            </div>

            <NavLink to="/login">
              <label className="label">
                <span className="text-sm">Already have an account?</span>
                <span className="label-text-alt link link-hover font-semibold text-blue-500">
                  Log In
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

export default Signup;
