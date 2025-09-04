// src/components/AttendeeInterestsChart.jsx
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CircleLegend from "./circlelegend";

const COLORS = ["#8884d8", "#FF8042", "#FFBB28", "#00C49F", "#FF4444", "#0088FE"];

export default function AttendeeInterestsChart({ data }) {
  
  // useMemo processes the API data and only recalculates when the data prop changes.
  const chartData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }

    // Convert object to array, sort by value descending, and take the top 5
    return Object.entries(data)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5)
      .map(([name, value]) => ({
        name,
        value,
      }));
  }, [data]);

  // If there's no data to display, show a message.
  if (!chartData || chartData.length === 0) {
    return (
      <div className="p-4 bg-white rounded-2xl shadow-md mt-[20px] h-full flex items-center justify-center">
        <p className="text-gray-500">No interest data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-[20px]">
      <h2 className="text-lg font-semibold mb-2">Top Attendee Interests</h2>
      <ResponsiveContainer width="100%" height={335}>
        <PieChart>
          <Pie
            data={chartData} // Use the processed chartData
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]}/>
          <Legend content={<CircleLegend />}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}