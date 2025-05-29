const EmployeeHome = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>
  
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <div className="flex-shrink-0 text-3xl text-blue-500">
                <i className="fas fa-users"></i>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
                <p className="text-3xl font-bold text-gray-900">1,250</p>
              </div>
            </div>
  
            {/* Active Sessions */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <div className="flex-shrink-0 text-3xl text-green-500">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-700">Active Sessions</h2>
                <p className="text-3xl font-bold text-gray-900">340</p>
              </div>
            </div>
  
            {/* New Messages */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <div className="flex-shrink-0 text-3xl text-red-500">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-700">New Messages</h2>
                <p className="text-3xl font-bold text-gray-900">45</p>
              </div>
            </div>
          </div>
  
          {/* User Management Table */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Management</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 text-sm text-gray-700">John Doe</td>
                  <td className="px-4 py-2 text-sm text-gray-700">johndoe@example.com</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Admin</td>
                  <td className="px-4 py-2 text-sm">
                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button className="text-red-500 hover:text-red-700 ml-4">Delete</button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-sm text-gray-700">Jane Smith</td>
                  <td className="px-4 py-2 text-sm text-gray-700">janesmith@example.com</td>
                  <td className="px-4 py-2 text-sm text-gray-700">User</td>
                  <td className="px-4 py-2 text-sm">
                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button className="text-red-500 hover:text-red-700 ml-4">Delete</button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default EmployeeHome;
  
