import React, { useState, useEffect, useRef } from "react";
import { Ticket, ShoppingCart, Banknote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import image1 from "../../assets/events/image 7.svg"
import image2 from "../../assets/events/image 8.svg"
import image3 from "../../assets/events/image 9.svg"
import image4 from "../../assets/events/image 10.svg"
const images = [image1, image2, image3, image4];

const EventCard = ({ event, onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Derived values
  const sold = event.seats.filter((s) => s.isBooked).length;
  const available = event.totalSeats - sold;
  const dateObj = new Date(event.date);
  const date = dateObj.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <div className="w-full rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] mt-[20px] p-4 bg-white hover:bg-[#f8f8f8]">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <img
            src={randomImage} // you can replace with dynamic icon if available
            alt=""
            className="w-6 h-6"
          />
          <h2 className="font-semibold text-lg">{event.title}</h2>
        </div>

        {/* Dropdown */}
        <div ref={dropdownRef} className="relative inline-block text-left">
          <button
            className="text-[#666666] hover:text-[#111] font-extrabold text-xl sm:text-[30px]"
            onClick={() => setOpen(!open)}
          >
            ⋮
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => onUpdate(event._id)}
                className="block w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                Update
              </button>
              <button
                onClick={() => onDelete(event._id)}
                className="block w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-100 rounded-b-lg"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-start gap-3 sm:gap-6 mt-2 sm:mt-3">
        <div className="flex items-center gap-1 text-green-600 font-semibold text-xs sm:text-sm">
          <Banknote size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>${event.price}</span>
        </div>
        <div className="flex items-center gap-1 text-red-500 font-semibold text-xs sm:text-sm">
          <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>{sold}</span>
        </div>
        <div className="flex items-center gap-1 text-purple-600 font-semibold text-xs sm:text-sm">
          <Ticket size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>{available}</span>
        </div>
      </div>

      <hr className="my-2 sm:my-3" />

      {/* Details */}
      <div className="text-xs sm:text-sm space-y-1 sm:space-y-2">
        <p>
          <span className="font-semibold text-[#666666]">Venue :</span>{" "}
          <span className="font-bold">{event.venue}</span>
        </p>
        <p>
          <span className="font-semibold text-[#666666]">Date :</span>{" "}
          <span className="font-bold">{date}</span>
        </p>
        <p>
          <span className="font-semibold text-[#666666]">Time :</span>{" "}
          <span className="font-bold">{time}</span>
        </p>
      </div>

      {/* Action */}
      <div className="flex justify-end mt-2 sm:mt-3">
        <Link to={`/event-info/${event._id}`}>
          <button className="rounded-full border-[2px] sm:border-[3px] border-[#111111] p-1 hover:bg-[#111111] hover:text-white transition">
            <ArrowRight size={24} className="sm:w-[30px] sm:h-[30px]" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
