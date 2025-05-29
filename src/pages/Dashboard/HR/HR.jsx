import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useState } from "react";
import { TbCheck, TbX } from "react-icons/tb";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const HR = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    // Fetch employees
    const { data: users = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/user/HR");
            return res.data;
        },
    });

    // Toggle verified status
    const toggleVerified = async (id, currentStatus) => {
        try {
            await axiosSecure.patch(`/user/verify/${id}`, { isVerified: currentStatus });
            refetch();
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            Swal.fire("Error", "Failed to update verification status.", "error");
        }
    };

    // Handle pay button click
    const handlePay = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    // Updated handlePayment function
    const handlePayment = async () => {
        if (!month || !year) {
            Swal.fire("Warning", "Please provide both month and year!", "warning");
            return;
        }

        try {
            const response = await axiosSecure.post("/payroll/request", {
                employeeId: selectedEmployee._id,
                email: selectedEmployee.email,
                name: selectedEmployee.name,
                salary: selectedEmployee.salary,
                month,
                year,
                status: "Pending", // Set the initial status to "Pending"
            });

            if (response.data.insertedId) {
                Swal.fire("Success", "Payment request created successfully!", "success");
                refetch(); // Refetch employees if needed
            } else {
                Swal.fire("Error", "Failed to create payment request.", "error");
            }

            // Reset modal state
            setIsModalOpen(false);
            setSelectedEmployee(null);
            setMonth("");
            setYear("");
        } catch (error) {
            console.error("Error creating payment request:", error);
            Swal.fire("Error", "An error occurred while creating the payment request.", "error");
        }
    };



    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6 mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Employee List</h1>
            <h1 className="text-xl font-bold mb-4 text-left">Total Employees: {users.length}</h1>
            <div className="card">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-orange-300 text-white">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Verified</th>
                                <th>Role</th> {/* Added Role Column */}
                                <th>Bank Account</th>
                                <th>Salary</th>
                                <th>Pay</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            onClick={() => toggleVerified(user._id, user.isVerified)}
                                            className="text-xl"
                                        >
                                            {user.isVerified ? (
                                                <TbCheck className="text-green-500" />
                                            ) : (
                                                <TbX className="text-red-500" />
                                            )}
                                        </button>
                                    </td>
                                    <td>{user.role || "N/A"}</td> {/* Display the role */}
                                    <td>{user.bank_account_no || "N/A"}</td>
                                    <td>${user.salary}</td>
                                    <td>
                                        <button
                                            onClick={() => handlePay(user)}
                                            className="btn btn-primary"
                                            disabled={!user.isVerified}
                                        >
                                            Pay
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/userDetails/${user.email}`}>
                                            <button
                                                className="btn btn-info"
                                            >
                                                Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DaisyUI Modal for Payment */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            Pay Salary for {selectedEmployee?.name}
                        </h3>
                        <p className="py-2">Salary: ${selectedEmployee?.salary}</p>
                        <input
                            type="text"
                            placeholder="Month (e.g., January)"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="input input-bordered w-full mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Year (e.g., 2025)"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="input input-bordered w-full mb-4"
                        />
                        <div className="modal-action">
                            <button
                                onClick={handlePayment}
                                className="btn btn-primary"
                            >
                                Pay
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn btn-error"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HR;
