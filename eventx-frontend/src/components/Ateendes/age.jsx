// src/components/AttendeeAgesChart.jsx
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CircleLegend from "./circlelegend";

const COLORS = ["#8884d8", "#FF4444", "#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

export default function AttendeeAgesChart({ data }) {
  
  // useMemo processes the data from the API and only recalculates it when the data prop changes.
  const chartData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }
    // Convert the { "18-24": 50 } object into a [{ name: "18-24", value: 50 }] array
    return Object.entries(data).map(([name, value]) => ({
      name,
      value,
    }));
  }, [data]);

  // If there's no data to display, show a message.
  if (!chartData || chartData.length === 0) {
    return (
      <div className="p-4 bg-white rounded-2xl shadow-md mt-[20px] h-full flex items-center justify-center">
        <p className="text-gray-500">No age data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-[20px]">
      <h2 className="text-lg font-semibold mb-2">Attendee Ages</h2>
      <ResponsiveContainer width="100%" height={335}>
        <PieChart>
          <Pie
            data={chartData} // Use the processed chartData
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]}/>
          <Legend content={<CircleLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}