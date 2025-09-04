import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// A predefined color palette for the chart bars
const COLORS = ["#3366FF", "#FF3333", "#339933", "#9933FF", "#FF9933", "#33CCCC", "#CCCC33", "#CC66CC"];

export default function AttendeeLocationsChart({ data }) {
  // useMemo will process the data from the API and only recalculate it when the data prop changes.
  const chartData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }

    const totalAttendees = Object.values(data).reduce((sum, count) => sum + count, 0);
    
    // Sort locations by count descending and take the top 10
    return Object.entries(data)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10)
      .map(([location, attendees], index) => ({
        location,
        attendees,
        percentage: `${((attendees / totalAttendees) * 100).toFixed(1)}%`,
        fill: COLORS[index % COLORS.length], // Cycle through colors
      }));
  }, [data]);

  if (!chartData || chartData.length === 0) {
    return (
      <div className="p-4 bg-white rounded-2xl shadow-md mr-[20px] h-[354px] flex items-center justify-center">
        <p className="text-gray-500">No location data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mr-[20px]">
      <h2 className="text-lg font-semibold mb-2">Top Attendee Locations</h2>
      <ResponsiveContainer width="100%" height={290}>
        <BarChart
          data={chartData}
          layout="vertical" // Switched to vertical layout for better readability of location names
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="location"
            width={80}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: '#f3f4f6' }}
            formatter={(value, name, props) => [`${value} (${props.payload.percentage})`, "Attendees"]}
          />

          <Bar dataKey="attendees" barSize={25} radius={[0, 10, 10, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}