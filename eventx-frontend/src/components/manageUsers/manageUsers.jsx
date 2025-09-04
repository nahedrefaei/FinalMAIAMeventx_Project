// src/components/manageUsers/ManageUsers.jsx
import { useEffect, useState } from "react";
import { getAllTicketsService } from "../services/authService"; // adjust path
import ResponsiveDrawer from "../DashboardScreen/maindashboard";
export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllTicketsService();
      setUsers(data.items || []);
    } catch (err) {
      console.error("❌ Failed to fetch users", err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <ResponsiveDrawer>
    <div className="m-6 bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Event Ticket</th>
                
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Checked In Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="px-4 py-3 text-sm text-gray-800">{user.user.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{user.user.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{user.event.title}</td>
                   
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.checkedIn === true
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.checkedIn ? "Checked In" : "Not Checked In"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </ResponsiveDrawer>
  );
}
