import { Instagram, Facebook, Twitter, QrCode } from "lucide-react";

export default function EngagementCard() {
  const data = [
    { icon: <Instagram className="w-5 h-5 text-pink-500" />, label: "Instagram Mentions", value: 5200 },
    { icon: <Facebook className="w-5 h-5 text-blue-500" />, label: "Facebook Shares", value: 3800 },
    { icon: <Twitter className="w-5 h-5 text-sky-400" />, label: "Twitter Tweets", value: 1200 },
    { icon: <QrCode className="w-5 h-5 text-gray-600" />, label: "Event Check-ins (QR scans)", value: 9500 },
  ];

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="w-[380px] rounded-xl shadow-md bg-white border border-gray-200 p-4">
      {/* Title */}
      <h2 className="font-bold text-gray-800 text-[15px]">
        Engagement & Social Media Reach
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        📢 How attendees engaged with the event
      </p>

      {/* List */}
      <div className="divide-y divide-gray-100   pr-1 mt-[20px]">
        {data.map((item, i) => (
          <div
            key={i}
            className=" h-[50px] flex justify-between items-center p-2 mb-[20px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
            <span className="text-[13px] font-semibold text-sky-600">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 text-center text-[13px] font-semibold text-green-600">
        TOTAL COUNT : {total.toLocaleString()}
      </div>
    </div>
  );
}
