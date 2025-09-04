import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CircleLegend from "./circlelegend";

const COLORS = ["#1D4ED8", "#16A34A", "#FACC15", "#EF4444"];

const AttendeeInterestsChart = ({ data }) => {
  // useMemo processes the API data and only recalculates when the data prop changes.
  const chartData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }

    // Convert object to array, sort by count descending, and take the top 4
    return Object.entries(data)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 4)
      .map(([name, value]) => ({
        name,
        value,
      }));
  }, [data]);

  // If there's no data to display, show a helpful message.
  if (chartData.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md h-[346px] flex items-center justify-center">
        <p className="text-gray-500">No interest data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md mr-[20px]">
      <h2 className="text-lg font-bold mb-4">ATTENDEE INTERESTS</h2>
      <ResponsiveContainer width="100%" height={270}>
        <PieChart>
          <Pie
            data={chartData} // Use the processed chartData from the API
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={<CircleLegend />} verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendeeInterestsChart;