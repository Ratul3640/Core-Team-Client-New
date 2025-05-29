import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import UseAxiosPublic from "../../../hook/useAxiosPublic";
import { useParams } from "react-router-dom";

const PaymentHistory = () => {
    const {email} = useParams()
    const axiosPublic = UseAxiosPublic();
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;

    // Fetch payment history for a specific email
    const { data: paymentHistory = [], isLoading, isError, error } = useQuery({
        queryKey: ["paymentHistory", email], // Include email in query key
        queryFn: async () => {
            const res = await axiosPublic.get(`/payment/${email}`);
            return res.data.sort((a, b) => {
                const dateA = new Date(`${a.year}-${a.month}-01`);
                const dateB = new Date(`${b.year}-${b.month}-01`);
                return dateA - dateB;
            });
        },
        enabled: !!email, // Only run query if email is provided
    });
    console.log(paymentHistory);

    const pageCount = Math.ceil(paymentHistory.length / rowsPerPage);

    // Paginate rows
    const getCurrentPageRows = () => {
        const startIndex = currentPage * rowsPerPage;
        return paymentHistory.slice(startIndex, startIndex + rowsPerPage);
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="p-6 mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Payment History for {paymentHistory.name}</h1>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                    </tr>
                </thead>
                <tbody>
                    {getCurrentPageRows().map((payment, index) => (
                        <tr key={payment._id}>
                            <td>{index + 1 + currentPage * rowsPerPage}</td>
                            <td>{payment.month}</td>
                            <td>{payment.year}</td>
                            <td>${payment.ammount}</td>
                            <td>{payment.paymentIntentId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {paymentHistory.length > rowsPerPage && (
                <div className="mt-4">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination flex justify-center space-x-2"}
                        activeClassName={"text-white bg-blue-500 rounded-lg px-3 py-1"}
                        pageLinkClassName={"px-3 py-1 border rounded-lg"}
                        previousLinkClassName={"px-3 py-1 border rounded-lg"}
                        nextLinkClassName={"px-3 py-1 border rounded-lg"}
                        breakLinkClassName={"px-3 py-1 border rounded-lg"}
                    />
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
