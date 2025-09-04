import UserResponsiveDrawer from "../usercomponents/usersidebar";
import { myTicketsService } from "../services/authService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import the QR Code component
const generateQRCodeSVG = (text) => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
    return url;
  };
  
export default function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const { data } = await myTicketsService();
                const ticketsData = data?.items || data;
                if (Array.isArray(ticketsData)) {
                    setTickets(ticketsData);
                } else {
                    console.error("Fetched ticket data is not an array:", ticketsData);
                    setTickets([]);
                }
            } catch (err) {
                console.error("Failed to load tickets:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    const TicketCard = ({ ticket }) => (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
        {/* Column 1: Ticket Details */}
        <div className="flex-1 w-full text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-800 mb-3">{ticket.event?.title || "Event Details"}</h2>
            <p className="text-sm text-gray-600 my-1 flex items-center justify-center sm:justify-start gap-2">
                <span>📅</span>
                {ticket.event?.date ? new Date(ticket.event.date).toLocaleDateString() : 'N/A'}
            </p>
             <p className="text-sm text-gray-600 my-1 flex items-center justify-center sm:justify-start gap-2">
                <span>📍</span>
                {ticket.event?.venue || 'N/A'}
            </p>
            <p className="text-base text-gray-700 my-3">
                <span className="font-semibold">Seats:</span> {ticket.seatNumber|| "N/A"}
            </p>
            <p className="text-xs text-gray-500 mt-3"><small>Ticket ID: {ticket._id}</small></p>
        </div>

        {/* Column 2: QR Code */}
        <div className="flex-shrink-0 mt-4 sm:mt-0">
            <p className="text-xs text-blue-500 mt-3"><small>Scan QR Code to check-in:</small></p>
            <img 
  src={generateQRCodeSVG(`${window.location.origin}/ticket/${ticket._id}`)} 
  alt="QR Code" 
  className="w-32 h-32" 
/>

        </div>
    </div>
    );

    const LoadingState = () => (
         <div className="text-center p-10 text-gray-500">
            <p>Loading your tickets...</p>
        </div>
    );

    const EmptyState = () => (
        <div className="text-center p-10 text-gray-500">
            <p>You have not booked any tickets yet.</p>
        </div>
    );

    return (
        <UserResponsiveDrawer>
            <main className="p-6 font-sans bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tickets</h1>
                
                {loading ? <LoadingState /> : (
                    tickets.length === 0 ? <EmptyState /> : (
                        // This grid is responsive: 1 column on small screens, 2 on large screens.
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {tickets.map(ticket => <TicketCard key={ticket._id} ticket={ticket} />)}
                        </div>
                    )
                )}
            </main>
        </UserResponsiveDrawer>
    );
}