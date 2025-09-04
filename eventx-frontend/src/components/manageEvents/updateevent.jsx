import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Pen from "../../assets/manageevents/even/Pen.png";
import EventLocation from "../../assets/manageevents/even/Location.png";
import PriceTagUSD from "../../assets/manageevents/even/Price Tag USD.svg";
import FlightSeat from "../../assets/manageevents/even/Flight Seat.svg";
import ResponsiveDrawer from "../DashboardScreen/maindashboard";
import { getEventService, updateEventService } from "../services/authService";

export default function UpdateEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    price: 0,
    totalSeats: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await getEventService(eventId);
        const eventData = data.event || data;
        
        const formattedDate = eventData.date ? new Date(eventData.date).toISOString().slice(0, 16) : "";

        setFormData({
            title: eventData.title || '',
            description: eventData.description || '',
            date: formattedDate,
            venue: eventData.venue || '',
            price: eventData.price || 0,
            totalSeats: eventData.totalSeats || 0,
        });
      } catch (err) {
        console.error("Failed to fetch event:", err);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  // FIX 1: This handler now correctly converts number inputs to numbers
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // If the input type is 'number', convert the value to a number. Otherwise, keep it as a string.
    const updatedValue = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: updatedValue }));
  };

  // FIX 2: This handler prepares a clean payload with guaranteed number types
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create a payload object to ensure data types are correct before sending
    const payload = {
      ...formData,
      price: Number(formData.price),
      totalSeats: Number(formData.totalSeats),
    };

    try {
      await updateEventService(eventId, payload);
      alert("Event updated successfully!");
      navigate("/manage-events");
    } catch (err) {
      console.error("Failed to update event:", err);
      // Try to get a more specific error message from the server response
      const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
      alert(`Update failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <ResponsiveDrawer><div className="p-10 text-center">Loading...</div></ResponsiveDrawer>;
  if (error) return <ResponsiveDrawer><div className="p-10 text-center text-red-500">{error}</div></ResponsiveDrawer>;

  return (
    <ResponsiveDrawer>
      <div className="h-full bg-white rounded-lg mr-5 p-5 pl-12">
        <div className="flex items-center mb-6">
          <Link to="/manage-events" className="p-2 rounded-full border-2 border-black hover:bg-black hover:text-white">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1">
            Edit Event Details
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="text-md font-semibold">Event Name</label>
              <div className="relative mt-2">
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border border-gray-300 pl-4 pr-12"
                  required
                />
                <img src={Pen} alt="icon" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"/>
              </div>
            </div>
            <div>
              <label className="text-md font-semibold">Event Date & Time</label>
              <div className="relative mt-2">
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border border-gray-300 px-4"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
              <label className="text-md font-semibold">Event Venue</label>
              <div className="relative mt-2">
                <input
                  name="venue"
                  type="text"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border border-gray-300 pl-4 pr-12"
                  required
                />
                <img src={EventLocation} alt="icon" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"/>
              </div>
          </div>
          
          <div>
            <label className="text-md font-semibold">Event Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-32 mt-2 rounded-lg border border-gray-300 p-4"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-md font-semibold">Ticket Price (LKR)</label>
              <div className="relative mt-2">
                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border border-gray-300 pl-4 pr-12"
                  required
                />
                <img src={PriceTagUSD} alt="icon" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"/>
              </div>
            </div>
            <div>
              <label className="text-md font-semibold">Total Seat Amount</label>
              <div className="relative mt-2">
                <input
                  type="number"
                  name="totalSeats"
                  min="0"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border border-gray-300 pl-4 pr-12"
                  required
                />
                <img src={FlightSeat} alt="icon" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"/>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-48 h-12 bg-blue-600 text-white font-bold rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </ResponsiveDrawer>
  );
}