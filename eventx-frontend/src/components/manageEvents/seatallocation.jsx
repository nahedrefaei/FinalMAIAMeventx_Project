// LatestEventSeatMap.jsx
import React from "react";

const SEAT_STATUS = {
  PAID: "paid",
  RESERVED: "reserved",
  AVAILABLE: "available",
};

const SEATS = [
  [SEAT_STATUS.AVAILABLE, SEAT_STATUS.RESERVED, SEAT_STATUS.RESERVED, SEAT_STATUS.PAID, SEAT_STATUS.AVAILABLE],
  [SEAT_STATUS.AVAILABLE, SEAT_STATUS.RESERVED, SEAT_STATUS.PAID, SEAT_STATUS.RESERVED, SEAT_STATUS.RESERVED, SEAT_STATUS.AVAILABLE],
  [SEAT_STATUS.RESERVED, SEAT_STATUS.PAID, SEAT_STATUS.RESERVED, SEAT_STATUS.RESERVED, SEAT_STATUS.PAID, SEAT_STATUS.RESERVED, SEAT_STATUS.AVAILABLE],
  [SEAT_STATUS.PAID, SEAT_STATUS.RESERVED, SEAT_STATUS.RESERVED, SEAT_STATUS.PAID, SEAT_STATUS.RESERVED, SEAT_STATUS.RESERVED, SEAT_STATUS.PAID],
];

const seatColors = {
  [SEAT_STATUS.PAID]: "bg-[#6340B6]",
  [SEAT_STATUS.RESERVED]: "bg-purple-400",
  [SEAT_STATUS.AVAILABLE]: "bg-gray-300",
};

export default function LatestEventSeatMap() {
  return (
    <div
      className="w-full max-w-4xl flex flex-col items-center gap-6 rounded-2xl p-6 bg-white border-[1px] border-[#ADADAD] mt-[20px]"
      
    >
      <h1 className="text-2xl font-bold text-center">Seat Allocation</h1>

      {/* Legend */}
      <div className="flex gap-4 text-sm">
        <Legend color="bg-[#6340B6]" label="Paid Seats" />
        <Legend color="bg-purple-400" label="Reserved Seats" />
        <Legend color="bg-gray-300" label="To be sold" />
      </div>

      {/* Seat grid */}
      <div className="flex flex-col gap-2 items-center justify-center mt-4">
        {SEATS.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-2 justify-center">
            {row.map((status, cIdx) => (
              <div
                key={cIdx}
                className={`w-12 h-12 rounded-md ${seatColors[status]}`}
                title={status}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full ${color}`}></div>
      <span>{label}</span>
    </div>
  );
}
