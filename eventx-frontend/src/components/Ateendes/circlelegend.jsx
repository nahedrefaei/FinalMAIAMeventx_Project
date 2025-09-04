// src/components/CircleLegend.jsx
export default function CircleLegend({ payload }) {
    return (
      <ul className="flex flex-wrap gap-4 justify-center mt-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            {/* Circle marker */}
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-sm">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  }
  