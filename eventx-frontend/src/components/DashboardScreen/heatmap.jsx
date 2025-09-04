// LatestEventSeatMap.jsx
import React from "react";

// Define seat statuses for clarity
const SEAT_STATUS = {
  PAID: "paid",
  RESERVED: "reserved", // Kept for the legend as per the design
  AVAILABLE: "available",
};

// Map statuses to Tailwind CSS color classes
const seatColors = {
  [SEAT_STATUS.PAID]: "bg-violet-700",
  [SEAT_STATUS.RESERVED]: "bg-violet-400",
  [SEAT_STATUS.AVAILABLE]: "bg-gray-300",
};

// The component now accepts an 'event' object as a prop
export default function LatestEventSeatMap({ event }) {

  // If no event data is provided, show a placeholder
  if (!event) {
    return (
      <div className="w-full flex items-center justify-center gap-8 rounded-2xl p-4 sm:p-6 h-full bg-white shadow-lg">
        <p className="text-gray-500 text-sm sm:text-base">No latest event data available.</p>
      </div>
    );
  }

  // Format the date for display
  const eventDate = event.date ? new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }) : 'Date not available';

  return (
    <div
      className="w-full flex flex-col lg:flex-row items-start gap-4 sm:gap-8 rounded-2xl p-4 sm:p-6"
      style={{ background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
    >
      {/* Left side: Event info + legend */}
      <div className="flex flex-col gap-2 w-full lg:min-w-[200px] lg:w-auto">
        <h2 className="text-lg sm:text-xl font-extrabold">Latest Event</h2>
        {/* Use the event data from props */}
        <p className="text-gray-700 font-medium text-sm sm:text-base">Event Name: <span className="text-black font-bold block">{event.title}</span></p>
        <p className="text-gray-700 text-sm sm:text-base">Event Date: <span className="text-black font-bold block">{eventDate}</span></p>

        <div className="mt-4 flex flex-row lg:flex-col gap-4 lg:gap-2 text-xs sm:text-sm">
          <Legend color={seatColors[SEAT_STATUS.PAID]} label="Paid Seats" />
          <Legend color={seatColors[SEAT_STATUS.RESERVED]} label="Reserved Seats" />
          <Legend color={seatColors[SEAT_STATUS.AVAILABLE]} label="To be sold" />
        </div>
      </div>

      {/* Right side: Seat grid rendered from API data */}
      <div className="flex-1 mt-4 lg:mt-[20px] w-full">
        <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-8 gap-1 sm:gap-2">
            {/* Map over the seats from the event prop */}
            {event.seats?.map((seat, index) => (
              <div
                key={seat.number || index}
                // Use the 'isBooked' property to determine the color
                className={`w-full h-6 sm:h-8 rounded-md ${seat.isBooked ? seatColors[SEAT_STATUS.PAID] : seatColors[SEAT_STATUS.AVAILABLE]}`}
                title={`Seat ${seat.number}`}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${color}`}></div>
      <span className="text-xs sm:text-sm">{label}</span>
    </div>
  );
}