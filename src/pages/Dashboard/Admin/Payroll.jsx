import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Payroll = () => {
    const axiosSecure = useAxiosSecure();
    const [payrolls, setPayrolls] = useState([]);

    const { isLoading, isError, error } = useQuery({
        queryKey: ["payroll"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payroll");
            setPayrolls(res.data);
            return res.data;
        },
    });

    // Update payroll status
    const updateStatus = async (id, status) => {
        try {
            await axiosSecure.patch(`/payroll/${id}`, { status });
            const updatedPayrolls = payrolls.map((payroll) =>
                payroll._id === id ? { ...payroll, status } : payroll
            );
            setPayrolls(updatedPayrolls);
        } catch (error) {
            Swal.fire("Error", "Failed to update status", "error");
        }
    };    

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6 mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Payroll Requests</h1>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Payment Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payrolls.map((request, index) => (
                        <tr key={request._id}>
                            <td>{index + 1}</td>
                            <td>{request.name}</td>
                            <td>${request.salary}</td>
                            <td>{request.month}</td>
                            <td>{request.year}</td>
                            <td>{request.paymentDate ? new Date(request.paymentDate).toLocaleDateString() : "N/A"}</td>
                            <td>{request.status}</td>
                            <td>
                                {request.status === "Pending" && (
                                    <>
                                        <button
                                            onClick={() => updateStatus(request._id, "Approved")}
                                            className="btn btn-success btn-sm mr-2"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(request._id, "Rejected")}
                                            className="btn btn-error btn-sm"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {request.status === "Approved" && !request.paymentDate && (
                                    <Link to={`/dashboard/payment/${request._id}`}>
                                        <button
                                            // onClick={() => handlePayment(request._id, request.month, request.year)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Pay
                                        </button>
                                    </Link>
                                )}
                                {request.status === "Paid" && (
                                    <span className="text-green-500 font-bold">Paid</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Payroll;
