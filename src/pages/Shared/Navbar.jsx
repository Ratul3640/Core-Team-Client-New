import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from '../../assets/Core-Team_Logo.png'
// import UseAdmin from "../../hook/useAdmin";
// import UseHR from "../../hook/useHR";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [isAdmin] = UseAdmin()
  // const [isHR] = UseHR()

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="navbar sticky top-0 z-50 bg-[#3E007C] text-white font-bold">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavLink to="/" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
                <li>
                  <a>Home</a>
                </li>
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
                <li>
                  <a>Contact Us</a>
                </li>
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
                <li>
                  <a>About Us</a>
                </li>
              </NavLink>

              {user && (
                <>
                  <NavLink to="/service" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
                    <li>
                      <a>Service</a>
                    </li>
                  </NavLink>
                  <NavLink to="/dashboard/overview" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
                    <li>
                      <a>Dashboard</a>
                    </li>
                  </NavLink>
                </>
              )}
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost text-xl">
            <img
              className="h-8 w-8"
              src={logo}
              alt="logo" /> CoreTeam
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
              <li>
                <a>Home</a>
              </li>
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
              <li>
                <a>Contact Us</a>
              </li>
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
              <li>
                <a>About Us</a>
              </li>
            </NavLink>
            {user && (
              <>
                <NavLink to="/service" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
                  <li>
                    <a>Service</a>
                  </li>
                </NavLink>
                <NavLink to="/dashboard/overview" className={({ isActive }) => (isActive ? "text-orange-600 font-bold" : "text-white")}>
                  <li>
                    <a>Dashboard</a>
                  </li>
                </NavLink>
              </>
            )}

          </ul>
        </div>
        <div className="navbar-end gap-4">
          {user ? (
            <div className="relative">
              {/* User Photo */}
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="h-14 w-14 object-cover cursor-pointer rounded-full border-2 border-gray-300"
                  onClick={toggleDropdown}
                />
              ) : (
                <span
                  className="h-10 w-10 cursor-pointer flex items-center justify-center rounded-full bg-gray-300 text-sm font-medium"
                  onClick={toggleDropdown}
                >
                  {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
                  <ul className="py-2">
                    <li className="px-4 py-2 text-sm text-gray-700">
                      {user.displayName || user.email}
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login">
                <a className="btn border-0 bg-gradient-to-r from-[#3E007C] via-[#6A0DAD] to-[#9A4DFF] text-white">Log In</a>
              </NavLink>
              <NavLink to="/signup">
                <a className="btn border-0 bg-gradient-to-r from-[#3E007C] via-[#6A0DAD] to-[#9A4DFF] text-white">Sign Up</a>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
