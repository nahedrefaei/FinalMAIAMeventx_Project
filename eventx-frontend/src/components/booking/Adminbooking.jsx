import React, { useEffect, useState } from "react";
import { getAllTicketsService, checkInService } from "../services/authService";
import QRCode from "react-qr-code";
import ResponsiveDrawer from "../DashboardScreen/maindashboard";

const AdminTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ALL tickets (admin only)
  const fetchTickets = async () => {
    try {
      const { data } = await getAllTicketsService();
      setTickets(data.items || []);
    } catch (err) {
      console.error("❌ Failed to fetch tickets", err);
      alert("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Handle Check In
  const handleCheckIn = async (token, ticketId) => {
    try {
      await checkInService({ token });
      setTickets((prev) =>
        prev.map((t) =>
          t._id === ticketId ? { ...t, checkedIn: true } : t
        )
      );
      alert(`✅ Ticket ${ticketId} checked in!`);
    } catch (err) {
      console.error("❌ Failed to check in ticket", err);
      alert("❌ Failed to check in ticket");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading tickets...</p>;

  return (
    <ResponsiveDrawer>
    <div className="p-6 bg-[#f5f5f5]">
      <h2 className="text-3xl font-bold mb-6 text-center ">🎟 All Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((t) => (
            <div
              key={t._id}
              className="bg-white shadow-lg rounded-2xl p-5 flex flex-col justify-between border hover:shadow-xl transition"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t.event?.title || "Unknown Event"}
                </h3>
                <p className="text-gray-600 text-sm">
                  <b>User:</b> {t.user?.name || "Unknown"}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Seat:</b> {t.seatNumber}
                </p>
                <p
                  className={`mt-2 font-medium ${
                    t.checkedIn ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {t.checkedIn ? "✅ Checked In" : "⏳ Booked"}
                </p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mt-4">
                <QRCode value={t.qrToken || "no-token"} size={120} />
              </div>

              <div className="mt-4">
                {!t.checkedIn ? (
                  <button
                    onClick={() => handleCheckIn(t.qrToken, t._id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition"
                  >
                    Check In
                  </button>
                ) : (
                  <span className="block text-center text-green-700 font-bold">
                    Already Checked In
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </ResponsiveDrawer>
  );
};

export default AdminTicketsPage;
