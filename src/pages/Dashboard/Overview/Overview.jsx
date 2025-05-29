import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const Overview = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch users data
    const { data: users = [], isLoading: usersLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/user");
            return res.data;
        },
    });

    // Fetch payments data
    const { data: payments = [], isLoading: paymentsLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payment");
            return res.data;
        },
    });

    // Fetch task hours data
    const { data: tasks = [], isLoading: tasksLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tasks");
            return res.data;
        },
    });

    // Aggregate revenue data by month
    const revenueData = payments.reduce((acc, payment) => {
        const month = payment.month.trim(); // Remove extra spaces
        const amount = Number(payment.ammount) || 0; // Ensure it's a number

        if (!acc[month]) {
            acc[month] = { month, revenue: 0 };
        }
        acc[month].revenue += amount;
        return acc;
    }, {});

    // Convert to array and sort months properly
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedRevenueData = Object.values(revenueData).sort(
        (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

    // Calculate total revenue
    const totalRevenue = payments.reduce((sum, payment) => sum + (Number(payment.ammount) || 0), 0);

    // Calculate total task hours
    const totalHours = tasks.reduce((sum, task) => sum + (Number(task.hours) || 0), 0);

    const userDistribution = [
        { name: "Free Users", value: 400 },
        { name: "Premium Users", value: 300 },
        { name: "Enterprise Users", value: 200 },
    ];

    const COLORS = ["#FF5733", "#33B5E5", "#FFC107"];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold text-gray-600">Total Users</h3>
                    <p className="text-2xl font-bold text-blue-500">
                        {usersLoading ? "Loading..." : users.length}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold text-gray-600">Total Pay Salary</h3>
                    <p className="text-2xl font-bold text-green-500">
                        {paymentsLoading ? "Loading..." : `$${totalRevenue.toLocaleString()}`}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold text-gray-600">Total Revenue</h3>
                    <p className="text-2xl font-bold text-orange-500">$250,000</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold text-gray-600">Total Hours</h3>
                    <p className="text-2xl font-bold text-purple-500">
                        {tasksLoading ? "Loading..." : totalHours}
                    </p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue Trends</h3>
                    {formattedRevenueData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={formattedRevenueData}>
                                <XAxis dataKey="month" stroke="#8884d8" />
                                <YAxis stroke="#8884d8" />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500 text-center">No revenue data available.</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">User Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={userDistribution} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                                {userDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Overview;
