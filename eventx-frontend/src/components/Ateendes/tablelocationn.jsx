import React, { useMemo } from "react";

// Define a color palette to be cycled through for the table rows
const COLORS = ["bg-blue-500", "bg-red-500", "bg-pink-500", "bg-yellow-400", "bg-green-600"];

export default function AttendeeLocations({ data }) {
  
  // useMemo processes the API data and only recalculates when the data prop changes.
  const tableData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }

    // Convert object to array, sort by count descending, and map to the required format
    return Object.entries(data)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([location, count], index) => ({
        location,
        count,
        color: COLORS[index % COLORS.length], // Assign a color from the palette
      }));
  }, [data]);

  return (
    <div className="w-[380px] rounded-xl bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <h2 className="font-bold text-gray-800 text-[15px] mb-3">
        ATTENDEE LOCATIONS
      </h2>
      
      {/* Table */}
      <table className="w-full border-collapse text-sm text-gray-800 rounded-[10px] p-2 ">
        <thead className="bg-white">
          <tr>
            <th className="border-2 border-collapse border-black px-3 py-2 text-left font-semibold">
              Location
            </th>
            <th className="border-2 border-collapse border-black px-3 py-2 text-left font-semibold">
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {/* If there is no data, show a message. Otherwise, map over the live data. */}
          {tableData.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center text-gray-500 py-4">No location data available.</td>
            </tr>
          ) : (
            tableData.map((item, i) => (
              <tr key={i} className="bg-white">
                <td className="border-2 border-collapse border-black px-3 py-2">{item.location}</td>
                <td className="border-2 border-collapse border-black px-3 py-2">
                  <div className="flex items-center justify-between">
                    {item.count}
                    <span
                      className={`w-3 h-3 rounded-full ${item.color}`}
                    ></span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}