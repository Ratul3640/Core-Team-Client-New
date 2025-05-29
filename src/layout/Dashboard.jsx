import { FaDollarSign, FaHistory, FaHome, FaUsers } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../hook/useAdmin";
import UseHR from "../hook/useHR";
import UseEmployee from "../hook/useEmployee";
import logo from '../../src/assets/Core-Team_Logo.png'
import { GrUserWorker } from "react-icons/gr";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = UseAdmin();
    const [isHR] = UseHR();
    const [isEmployee] = UseEmployee()


    return (
        <div className="flex px-10">
            <div className="w-64 min-h-screen bg-orange-700 ">
                <ul className="menu p-10 ">
                    <NavLink className="flex flex-col items-center justify-center" to="/"><img
                        className="h-14 w-14 "
                        src={logo}
                        alt="logo" />
                        <span className="font-extrabold text-2xl text-white">Core Team</span>
                    </NavLink>
                    <hr className="my-4" />
                    {
                        isEmployee && <>
                            {/* <li>
                                <NavLink to="/dashboard/employeeHome">
                                <FaHome></FaHome>
                                Employee Home</NavLink>
                            </li> */}
                            <li>
                                <NavLink to={`/dashboard/overview`}>
                                    <FaHistory />
                                    OverView</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/employee">
                                    <GrUserWorker />
                                    Work Sheet</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/dashboard/paymentHistory/${user?.email}`}>
                                    <FaHistory />
                                    Payment History</NavLink>
                            </li>

                            {/* <li>
                                <NavLink to={`/dashboard/paymentHistory/shahadatsohel5133@gmail.com`}>
                                <FaHistory />
                                Payment History</NavLink>
                            </li> */}

                        </>
                    }
                    {
                        isAdmin && <>
                            {/* <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li> */}
                            <li>
                                <NavLink to={`/dashboard/overview`}>
                                    <FaHistory />
                                    OverView</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allEmployee">
                                    <FaUsers></FaUsers> All Employee List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/payRoll">
                                    <FaDollarSign></FaDollarSign> Pay Roll
                                </NavLink>
                            </li>

                        </>
                    }
                    {
                        isHR && <>
                            {/* <li>
                                <NavLink to="/dashboard/hrHome">
                                <FaHome></FaHome>
                                HR Home</NavLink>
                            </li> */}
                            <li>
                                <NavLink to={`/dashboard/overview`}>
                                    <FaHistory />
                                    OverView</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/employeeList">
                                    <FaUsers></FaUsers>
                                    Employee List</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/dashboard/paymentHistory/${user?.email}`}>
                                    <FaHistory />
                                    Payment History</NavLink>
                            </li>

                        </>
                    }

                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                            <IoMdMail />
                            CONTACT</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default Dashboard;
