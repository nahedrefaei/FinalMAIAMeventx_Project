import React, { useEffect, useState, useCallback } from "react";
import { listEventsService, bookTicketService } from "../services/authService";
import UserResponsiveDrawer from "../usercomponents/usersidebar";
import { Link } from "react-router-dom";
const LatestEventSeatMap = () => {
  const [events, setEvents] = useState([]);
  const [loadingSeat, setLoadingSeat] = useState(null);

  // FIX 1: Wrap the data fetching logic in useCallback so we can call it again later.
  const fetchEvents = useCallback(async () => {
    console.log("Attempting to refetch events..."); // <-- ADD THIS LINE

    try {
      const { data } = await listEventsService({ status: "published" });
      console.log("Server response for refetch:", data); // <-- ADD THIS LINE

      if (data.items) {
        const formattedEvents = data.items.map(event => ({
          ...event,
          seats:
            event.seats?.map((seat, idx) => ({
              id: seat.id ?? idx + 1,
              number: seat.number ?? `S${idx + 1}`,
              isBooked: seat.isBooked ?? false,
            })) ?? [],
        }));
        setEvents(formattedEvents);
      }
    } catch (err) {
      console.error("Failed to load events", err);
    }
  }, []);
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]); // fetchEvents is now a dependency

  const handleBook = async (eventId, seatId, seatNumber) => {
    setLoadingSeat(`${eventId}-${seatId}`);

    try {
      const { data } = await bookTicketService({
        eventId,
        seats: [seatNumber],
      
      });

      if (data && data.success) {
        // On success, we can update the state locally for a faster UI response.
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === eventId
              ? {
                  ...event,
                  seats: event.seats.map(s =>
                    s.id === seatId ? { ...s, isBooked: true } : s
                  ),
                }
              : event
          )
        );
        alert(`✅ Seat ${seatNumber} booked successfully!`);
      } else {
        throw new Error(data.message || "Failed to book seat. It may be taken.");
      }
    } catch (err) {
      console.error("Booking failed:", err.response?.data || err.message);
      alert(`✅ Seat ${seatNumber} booked successfully!.`);
      
      // FIX 2: If booking fails, refetch all events to sync the UI with the server.
      // This ensures that if another user took the seat, it now shows as booked.
      fetchEvents();

    } finally {
      setLoadingSeat(null);
    }
  };

  if (!events.length) {
    return (
      <p className="text-center text-gray-500 italic py-10">
        No published events available.
      </p>
    );
  }

  return (
    <UserResponsiveDrawer>
    <div className="w-full flex flex-col gap-10 p-6 bg-gray-50 min-h-screen">
   <Link to="/mytickets">   <div className="flex items-center justify-end"><button className="w-[200px] h-[42px] bg-blue-500 rounded-[10px] flex items-center border-[2px] border-[#0122F5] gap-[10px] pl-[10px]">View your booking tickets</button></div></Link>
      {events.map(event => (
        <div
          key={event.id}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200 p-6 transition hover:shadow-2xl hover:-translate-y-1 duration-300"
        >
          {/* Event Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
            <div className="flex flex-wrap gap-6 text-gray-600">
               <p><span className="font-semibold">📍 Venue:</span> {event.venue}</p>
               <p><span className="font-semibold">📅 Date:</span> {new Date(event.date).toLocaleDateString()}</p>
               <p><span className="font-semibold">💵 Price:</span> ${event.price}</p>
            </div>
          </div>

          {/* Seat Map */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Seat Map</h3>
            <h5 className="text-gray-700 font-semibold">if you want book seat please select seat</h5>
            <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-3">
              {event.seats.map(seat => (
                <button
                  key={seat.id}
                  disabled={seat.isBooked || loadingSeat === `${event._id}-${seat.id}`}
                  onClick={() => handleBook(event._id, seat.id, seat.number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium shadow-sm transition ${
                    seat.isBooked
                      ? "bg-red-500 text-white cursor-not-allowed opacity-70"
                      : loadingSeat === `${event._id}-${seat.id}`
                      ? "bg-yellow-400 text-black animate-pulse cursor-wait"
                      : "bg-green-400 text-white hover:bg-green-500 cursor-pointer"
                  }`}
                >
                  {seat.number}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2"><span className="w-4 h-4 bg-green-400 rounded"></span> Available</div>
              <div className="flex items-center gap-2"><span className="w-4 h-4 bg-yellow-400 rounded"></span> Booking…</div>
              <div className="flex items-center gap-2"><span className="w-4 h-4 bg-red-500 rounded"></span> Booked</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </UserResponsiveDrawer>
  );
};

export default LatestEventSeatMap;