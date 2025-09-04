// CustomerEngagementCard.jsx
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
} from "recharts";

const COLORS = ["#7A5AF8", "#2563EB", "#F59E0B", "#34D399", "#F43F5E"];
const fmtNumber = (n) => (n || 0).toLocaleString();

// The component now only accepts the 'events' prop
export default function CustomerEngagementCard({ events }) {
  
  const { total, data } = useMemo(() => {
    if (!events || events.length === 0) {
      return { total: 0, data: [] };
    }

    // 1. Map over events to calculate the number of booked seats for each one
    const salesByEvent = events.map(event => ({
        name: event.title,
        // Count booked seats directly from the event's seats array
        value: event.seats?.filter(seat => seat.isBooked).length || 0,
      }));

    // 2. Calculate the grand total of all tickets sold across all events
    const totalValue = salesByEvent.reduce((sum, event) => sum + event.value, 0);

    // 3. Filter, sort, and format the data for the chart
    const chartData = salesByEvent
      .filter(event => event.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map((event, index) => ({
        ...event,
        pct: totalValue > 0 ? Math.round((event.value / totalValue) * 100) : 0,
        color: COLORS[index % COLORS.length],
      }));
      
    return { total: totalValue, data: chartData };
  }, [events]);

  if (data.length === 0) {
      return (
          <div className="w-full rounded-2xl p-4 sm:p-6 h-[350px] sm:h-[412px] flex flex-col items-center justify-center bg-white shadow-lg">
              <h2 className="text-lg sm:text-2xl font-extrabold text-center mb-6">Top Events by Sales</h2>
              <p className="text-gray-500 text-sm sm:text-base">No ticket sales data available.</p>
          </div>
      );
  }

  return (
    <div
      className="w-full rounded-2xl p-4 sm:p-6"
      style={{ background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
    >
      <h2 className="text-lg sm:text-2xl font-extrabold text-center mb-4 sm:mb-6">
        Top Events by Sales
      </h2>
      <div className="h-64 sm:h-92 w-full">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              innerRadius="60%"
              outerRadius="100%"
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                value={`Total: ${fmtNumber(total)}`}
                position="center"
                style={{ fontSize: "16px", fontWeight: "bold", fill: "#111" }}
              />
            </Pie>
            <Tooltip
              formatter={(val, name, props) => [
                `${fmtNumber(val)} tickets`,
                `${props.payload.name} (${props.payload.pct}%)`,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm font-medium">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}