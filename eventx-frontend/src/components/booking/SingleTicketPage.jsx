import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicketService } from "../services/authService";

export default function SingleTicketPage() {
  const { id } = useParams(); // ticket ID from URL
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePrint = () => {
    window.print();
  };
  
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data } = await getTicketService(id); // fetch by ID
        setTicket(data.ticket);
      } catch (err) {
        console.error("❌ Failed to fetch ticket", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) return <p className="p-6">Loading ticket...</p>;
  if (!ticket) return <p className="p-6 text-red-500">Ticket not found</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-3">{ticket.event?.title}</h2>
    
      <p className="text-gray-600 mb-2">📅 {new Date(ticket.event?.date).toLocaleString()}</p>
      <p className="text-gray-600 mb-2">📍 {ticket.event?.venue}</p>
      <p className="text-lg font-semibold">Seat: {ticket.seatNumber}</p>
      <p className="text-sm text-gray-500 mt-3">Ticket ID: {ticket._id}</p>
      <p className="mt-3">
        Status: {ticket.checkedIn ? 
          <span className="text-green-600 font-semibold">✅ Checked In</span> 
          : <span className="text-yellow-600">Not Checked In</span>}
      </p>
      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handlePrint}>
        print ticket
      </button>
    </div>
  );
}
