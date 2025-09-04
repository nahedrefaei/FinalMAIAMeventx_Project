import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Scatter,
  LabelList
} from "recharts";

// Custom circle shape with a larger radius
const BigCircle = ({ cx, cy, fill }) => {
  return <circle cx={cx} cy={cy} r={14} fill={fill} stroke="#fff" strokeWidth={2} />;
};

export default function AttendeeAgeLollipopChart({ data }) {
  // useMemo will process the API data and only recalculate when the data prop changes.
  const chartData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }
    
    // Transform the ageBuckets object into an array with one item for the chart
    // and rename keys to be valid for Recharts dataKey property.
    const processedData = {
      name: 'Total Attendees',
      '18-24': data['18-24'],
      '25-34': data['25-34'],
      '35-44': data['35-44'],
      '45-54': data['45-54'],
      '55+': data['55+'],
    };

    // Calculate the min/max values for the vertical "stick"
    const values = Object.values(processedData).filter(v => typeof v === 'number');
    processedData.stickMin = Math.min(...values);
    processedData.stickMax = Math.max(...values);
    
    return [processedData]; // Return as an array with a single element
  }, [data]);


  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-[300px] bg-white flex items-center justify-center">
        <p className="text-gray-500">No age data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] bg-white ">
      <h2 className="text-lg font-semibold mb-4">Attendee Age Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <XAxis dataKey="name" tick={{ fontSize: 14, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />

          {/* Stick (thin vertical line) */}
          <Bar dataKey="stickMax" fill="#cccccc" barSize={2} isAnimationActive={false} />

          {/* Scatter dots for each age group */}
          <Scatter name="18 - 24" dataKey="18-24" fill="#3b82f6" shape={BigCircle}>
            <LabelList dataKey="18-24" position="inside" fill="#fff" fontSize={12} />
          </Scatter>
          <Scatter name="25 - 34" dataKey="25-34" fill="#facc15" shape={BigCircle}>
            <LabelList dataKey="25-34" position="inside" fill="#000" fontSize={12} />
          </Scatter>
          <Scatter name="35 - 44" dataKey="35-44" fill="#ef4444" shape={BigCircle}>
            <LabelList dataKey="35-44" position="inside" fill="#fff" fontSize={12} />
          </Scatter>
          <Scatter name="45 - 54" dataKey="45-54" fill="#a855f7" shape={BigCircle}>
             <LabelList dataKey="45-54" position="inside" fill="#fff" fontSize={12} />
          </Scatter>
          <Scatter name="55+" dataKey="55+" fill="#22c55e" shape={BigCircle}>
            <LabelList dataKey="55+" position="inside" fill="#fff" fontSize={12} />
          </Scatter>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};