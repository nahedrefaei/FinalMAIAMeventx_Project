import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Pen from "../../assets/manageevents/even/Pen.png";
import TimeMachine from "../../assets/manageevents/even/Time Machine.png";
import WindowColor from "../../assets/manageevents/even/Window Color.png";
import EventLocation from "../../assets/manageevents/even/Location.png";
import PriceTagUSD from "../../assets/manageevents/even/Price Tag USD.svg";
import FlightSeat from "../../assets/manageevents/even/Flight Seat.svg";
import Popular from "../../assets/manageevents/even/Popular.svg";
import WaitingRoom from "../../assets/manageevents/even/Waiting Room.png";
import LatestEventSeatMap from "./seatallocation";
import Tags from "../../assets/manageevents/even/Tags.png";
import Group from "../../assets/manageevents/even/Group.png";
import frame from "../../assets/manageevents/even/frame 1.svg";
import ResponsiveDrawer from "../DashboardScreen/maindashboard";
import { getEventService, updateEventService } from "../services/authService";

export default function EventInfo() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!eventId) throw new Error("No Event ID provided.");
        
        const { data } = await getEventService(eventId);
        const eventData = data.event || data;
        
        // Set the initial state for the form, formatting the date correctly
        setFormData(eventData);

      } catch (err) {
        console.error("Failed to fetch event:", err);
        setError("Failed to load event details. It may not exist.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  // Handles changes for all input fields, converting numbers correctly
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? Number(value) : value;
    setFormData(prevData => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Destructure formData to remove server-controlled fields before sending
    const { 
      _id, seats, status, createdBy, createdAt, updatedAt, __v, popularity, 
      ...payload 
    } = formData;

    try {
      // Send the clean 'payload' object
      await updateEventService(eventId, payload);
      alert("Event updated successfully!");
      navigate("/manage-events");
    } catch (err) {
      console.error("Update failed:", err);
      const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
      alert(`Update failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <ResponsiveDrawer><div className="p-10 text-center">Loading...</div></ResponsiveDrawer>;
  if (error) return <ResponsiveDrawer><div className="p-10 text-center text-red-500">{error}</div></ResponsiveDrawer>;
  if (!formData) return <ResponsiveDrawer><div className="p-10 text-center">Event not found.</div></ResponsiveDrawer>;

  const bookedSeats = formData.seats?.filter(s => s.isBooked).length || 0;
  const availableSeats = (formData.totalSeats || 0) - bookedSeats;

  // Format date for the datetime-local input
  const formattedDate = formData.date ? new Date(formData.date).toISOString().slice(0, 16) : '';

  return (
    <ResponsiveDrawer>
      <div className="min-h-screen bg-[#ffffff] rounded-none sm:rounded-[15px] mr-0 sm:mr-[20px] p-3 sm:p-[20px] sm:pl-[50px]">
        <div className="ml-0 sm:ml-[20px] pt-[5px] mr-0 sm:mr-[40px] flex items-center">
          <Link to="/manage-events" className="p-1 rounded-full border-2 sm:border-[3px] border-[#111111] hover:bg-[#111111] hover:text-white">
            <ArrowLeft size={24} className="sm:w-[30px] sm:h-[30px]" />
          </Link>
          <h1 className="text-lg sm:text-[24px] font-bold text-center m-auto mt-[0px]">
            Edit Event Details
          </h1>
        </div>
        <div className="ml-0 sm:ml-[20px]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-[10px]">
              <div className="mt-[20px] flex-1">
                <div><label className="text-sm sm:text-[16px] font-bold">Event Name</label></div>
                <div className="w-full max-w-[750px] h-[45px] sm:h-[50px] rounded-[8px] sm:rounded-[10px] border-[1px] border-[#ADADAD] flex items-center justify-between pr-2 sm:pr-[10px] pl-2 sm:pl-[10px]">
                  <input name="title" onChange={handleChange} value={formData.title || ''} className="w-full h-[43px] sm:h-[48px] bg-transparent outline-none text-sm sm:text-base" type="text" required />
                  <img src={Pen} alt="edit icon" className="w-4 h-4 sm:w-auto sm:h-auto" />
                </div>
              </div>
              <div className="mt-[20px]">
                <div><label className="text-sm sm:text-[16px] font-bold">Event Date & Time</label></div>
                <div className="w-full sm:w-[280px] h-[45px] sm:h-[50px] rounded-[8px] sm:rounded-[10px] border-[1px] border-[#ADADAD] flex items-center justify-between pr-2 sm:pr-[10px] pl-2 sm:pl-[10px]">
                  <input name="date" onChange={handleChange} value={formattedDate} className="w-full h-[43px] sm:h-[48px] bg-transparent outline-none text-sm sm:text-base" type="datetime-local" required />
                </div>
              </div>
            </div>

            <div className="mt-[30px]">
              <div><label className="text-sm sm:text-[16px] font-bold">Event Venue</label></div>
              <div className="w-full h-[45px] sm:h-[50px] rounded-[8px] sm:rounded-[10px] border-[1px] border-[#ADADAD] flex items-center justify-between pr-2 sm:pr-[10px] pl-2 sm:pl-[10px] mr-0 sm:mr-[65px]">
                <input name="venue" onChange={handleChange} value={formData.venue || ''} className="w-full h-[43px] sm:h-[48px] bg-transparent outline-none text-sm sm:text-base" type="text" required />
                <img src={EventLocation} alt="location icon" className="w-4 h-4 sm:w-auto sm:h-auto" />
              </div>
            </div>
            
            <div className="mt-[30px] mr-0 sm:mr-[50px]">
              <div><label className="text-sm sm:text-[16px] font-bold">Event Description</label></div>
              <div>
                <textarea name="description" onChange={handleChange} value={formData.description || ''} className="w-full h-[100px] sm:h-[120px] rounded-[8px] sm:rounded-[10px] border-[1px] border-[#ADADAD] p-2 sm:p-3 bg-transparent outline-none text-sm sm:text-base" required />
              </div>
            </div>

            <div className="mt-[30px] sm:mt-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[10px]">
              <div>
                <div><label className="text-sm sm:text-base">Ticket Price</label></div>
                <div className="flex items-center justify-between w-full sm:w-[230px] h-[45px] sm:h-[50px] rounded-[8px] sm:rounded-[10px] border-[1px] border-[#ADADAD] pr-2 sm:pr-[10px] pl-2 sm:pl-[10px]">
                  <input name="price" type="number" min="0" onChange={handleChange} value={formData.price || 0} className="w-full bg-transparent outline-none text-sm sm:text-base" required />
                  <img src={PriceTagUSD} alt="price icon" className="w-4 h-4 sm:w-auto sm:h-auto" />
                </div>
              </div>
              <div>
                <div><label className="text-sm sm:text-base">Total Seats</label></div>
                <div className="flex items-center justify-between w-full sm:w-[230px] h-[45px] sm:h-[50px] rounded-[8px] sm:rounded-[10px] border-[1px] border-[#ADADAD] pr-2 sm:pr-[10px] pl-2 sm:pl-[10px]">
                  <input name="totalSeats" type="number" min="0" onChange={handleChange} value={formData.totalSeats || 0} className="w-full bg-transparent outline-none text-sm sm:text-base" required />
                  <img src={FlightSeat} alt="seat icon" className="w-4 h-4 sm:w-auto sm:h-auto" />
                </div>
              </div>
              <div>
                <div><label className="text-sm sm:text-base">Available Seats</label></div>
                <div className="flex items-center justify-between w-full sm:w-[230px] h-[45px] sm:h-[50px] rounded-[8px] sm:rounded-[10px] border-[1px] border-[#ADADAD] pr-2 sm:pr-[10px] pl-2 sm:pl-[10px]">
                  <input className="w-full bg-transparent outline-none text-sm sm:text-base" type="text" value={availableSeats} readOnly />
                  <img src={WaitingRoom} alt="available seats icon" className="w-4 h-4 sm:w-auto sm:h-auto" />
                </div>
              </div>
              <div>
                <div><label className="text-sm sm:text-base">Popularity</label></div>
                <div className="flex items-center justify-between w-full sm:w-[230px] h-[45px] sm:h-[50px] rounded-[8px] sm:rounded-[10px] border-[1px] border-[#ADADAD] pr-2 sm:pr-[10px] pl-2 sm:pl-[10px]">
                   <input className="w-full bg-transparent outline-none text-sm sm:text-base" type="text" value={formData.popularity || 0} readOnly />
                  <img src={Popular} alt="popularity icon" className="w-4 h-4 sm:w-auto sm:h-auto" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 lg:gap-[20px] mt-[30px]">
              <div className="order-2 lg:order-1">
                <LatestEventSeatMap eventSeats={formData.seats} />
              </div>
              <div className="mt-[20px] order-1 lg:order-2">
                {/* Other non-editable info */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 sm:gap-[30px] lg:gap-[30px] mt-[25px] w-full lg:w-[370px] h-auto lg:h-[280px] border-[1px] rounded-[8px] sm:rounded-[10px] border-[#ADADAD] p-4 sm:pr-[10px] sm:pl-[10px]">
                  <div className="flex-shrink-0">
                    <img src={frame} alt="qr frame" className="w-24 h-24 sm:w-auto sm:h-auto"/>
                  </div>
                  <div className="text-center sm:text-left lg:text-center">
                    <p className="text-sm sm:text-base">Scan QR code for easy payments</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[20px] mt-[30px]">
                    <button type="submit" disabled={isSubmitting} className="w-full sm:w-[170px] h-[45px] sm:h-[50px] bg-[#CF730A] rounded-[8px] sm:rounded-[10px] text-white font-bold disabled:bg-gray-400 text-sm sm:text-base">
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                <Link to={`/insights`} className="w-full sm:w-auto">
                <button type="button" className="w-full sm:w-[180px] h-[45px] sm:h-[50px] bg-[#1A6291] rounded-[8px] sm:rounded-[10px] text-white font-bold text-sm sm:text-base">
                        Attendee Insight
                    </button>
                </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ResponsiveDrawer>
  );
}