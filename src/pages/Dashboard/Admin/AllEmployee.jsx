import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { TbUserX, TbUserCheck, TbCurrencyDollar } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

const AllEmployee = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/user/admin");
            return res.data;
        },
    });

    const handleFired = (id) => {
        Swal.fire({
            title: "Are you sure you want to fire this employee?",
            text: "They won't be able to log in anymore!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Fire!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/user/fire/${id}`, { fired: true }).then((res) => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Fired!",
                            text: "The employee has been fired successfully.",
                            icon: "success",
                        });
                        refetch();
                    }
                });
            }
        });
    };

    const handleMakeHR = (id) => {
        Swal.fire({
            title: "Are you sure you want to make this employee HR?",
            text: "This employee will now have HR privileges.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make HR!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/user/make-hr/${id}`, { role: "HR" }).then((res) => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Success!",
                            text: "The employee has been promoted to HR.",
                            icon: "success",
                        });
                        refetch();
                    }
                });
            }
        });
    };

    const handleAdjustSalary = (id, currentSalary) => {
        Swal.fire({
            title: "Adjust Salary",
            input: "number",
            inputLabel: `Current Salary: $${currentSalary}`,
            inputPlaceholder: "Enter new salary",
            showCancelButton: true,
            confirmButtonText: "Update",
            inputValidator: (value) => {
                if (!value || isNaN(value) || Number(value) <= currentSalary) {
                    return `Please enter a valid amount greater than the current salary of $${currentSalary}`;
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const newSalary = Number(result.value);
                axiosSecure
                    .put(`/user/salary/${id}`, { salary: newSalary })
                    .then((res) => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Success!",
                                text: "The salary has been updated successfully.",
                                icon: "success",
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6 mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">All Employee List</h1>
            <h1 className="text-xl font-bold mb-4 text-left">
                Total Employees: {users.length}
            </h1>
            <div className="card">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-orange-300 text-white">
                                <th>#</th>
                                <th>NAME</th>
                                <th>DESIGNATION</th>
                                <th>SALARY</th>
                                <th>ADJUST SALARY</th>
                                <th>MAKE HR</th>
                                <th>FIRE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.role}</td>
                                    <td>${item.salary}</td>
                                    <td>
                                        <button
                                            onClick={() => handleAdjustSalary(item._id, item.salary)}
                                            className="text-green-600 text-xl flex"
                                        >
                                            <FaPlus /><TbCurrencyDollar />
                                        </button>
                                    </td>
                                    <td>
                                        {item.role !== "HR" ? (
                                            <button
                                                onClick={() => handleMakeHR(item._id)}
                                                className="text-blue-700 text-xl"
                                            >
                                                <TbUserCheck />
                                            </button>
                                        ) : (
                                            <span className="text-green-500 font-bold">HR</span>
                                        )}
                                    </td>
                                    <td>
                                        {item.fired ? (
                                            <span className="text-red-500 font-bold">Fired</span>
                                        ) : (
                                            <button
                                                onClick={() => handleFired(item._id)}
                                                className="text-red-700 text-xl ml-2"
                                            >
                                                <TbUserX />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllEmployee;
