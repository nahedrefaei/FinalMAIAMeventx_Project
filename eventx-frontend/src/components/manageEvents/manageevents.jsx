import { useEffect, useState, useRef } from "react";
import Search from "../../assets/Search.png";
import Filter from "../../assets/manageevents/Tune.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import EventCard from "./detailEvent";
import ResponsiveDrawer from "../DashboardScreen/maindashboard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// 1. Import deleteEventService
import { listEventsService, deleteEventService } from "../services/authService";

export default function ManageEvents() {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [closedEvents, setClosedEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await listEventsService();
      const items = res.data.items || [];

      // Categorize by status
      setUpcomingEvents(items.filter((e) => e.status === "published"));
      setPendingEvents(items.filter((e) => e.status === "draft"));
      setClosedEvents(items.filter((e) => e.status === "closed"));
    } catch (err) {
      setError("Failed to fetch events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 2. Create the handleDelete function
  const handleDelete = async (eventId) => {
    // Add a confirmation dialog for safety
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return;
    }
   
    try {
      await deleteEventService(eventId);
      // After successful deletion, refetch all events to update the UI
      fetchEvents();
    } catch (err) {
      console.error("Failed to delete event:", err);
      alert("Failed to delete the event. Please try again.");
    }
  };
  const handleUpdate = (eventId) => {
    navigate(`/event-info/${eventId}`)
    
   };

  return (
    <ResponsiveDrawer>
      <div className="min-h-screen bg-[#F2F2F2] rounded-none sm:rounded-[15px] mr-0 sm:mr-[20px]">
        {/* Header Section */}
        <div className=" bg-[#ffffff]  rounded-[15px] rounded-bl-[0px] rounded-br-[0px] p-[20px]">

          <div className="flex items-center justify-between mb-[20px]">

            <h1 className="text-[24px] font-extrabold">

              Event Management Section

            </h1>

            <div className="flex items-center gap-[10px]">

              <div className="w-[120px] h-[42px] bg-white rounded-[10px] flex items-center border-[1px] border-[#111111] gap-[10px] pl-[10px]">

                <img src={Filter} alt="" />

                <button>filter</button>

                <ArrowDropDownIcon sx={{ fontSize: "50px" }} />

              </div>

              <div className="w-[291px] h-[42px] bg-white rounded-[10px] flex items-center border-[1px] border-[#111111] gap-[10px] pl-[10px]">

                <button>

                  <img src={Search} alt="" />

                </button>

                <input type="text" placeholder="Search..." />

              </div>

            </div>

          </div>



          {/* Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-[10px]">

              <div className="w-full sm:w-[200px] h-[35px] sm:h-[42px] bg-white rounded-[8px] sm:rounded-[10px] flex items-center border-[2px] border-[#0122F5] gap-2 sm:gap-[10px] pl-2 sm:pl-[10px]">

                <Link to="/create-event">

                  <button className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-full border-[1px] border-[#0122F5] flex items-center justify-center">

                    <AddIcon color="primary" sx={{ fontSize: { xs: "16px", sm: "20px" } }} />

                  </button>

                </Link>

                <h1 className="text-[#0122F5] text-sm sm:text-base">New Event</h1>

              </div>

              <div className="w-full sm:w-[200px] h-[35px] sm:h-[42px] bg-white rounded-[8px] sm:rounded-[10px] flex items-center border-[2px] border-[#FA921B] gap-2 sm:gap-[10px] pl-2 sm:pl-[10px]">

                <h1 className="text-[#FA921B] text-sm sm:text-base">Attendee Insights</h1>

                <button>

                  <ArrowDropDownIcon
                    sx={{ fontSize: { xs: "30px", sm: "50px" }, color: "#FA921B" }}
                  />

                </button>              </div>

            </div>

            <div className="flex items-center gap-[10px]">

              <div className="w-[220px] h-[42px] bg-white rounded-[10px] flex items-center border-[1px] border-[#111111] gap-[10px] pl-[10px]">

                <h1>Sort By: &nbsp; &nbsp; &nbsp; Status</h1>

                <button>

                  <ArrowDropDownIcon

                    sx={{ fontSize: "50px", color: "#111111" }}

                  />

                </button>

              </div>

              <div className="w-[150px] h-[42px] bg-white rounded-[10px] flex items-center border-[1px] border-[#111111] gap-[10px] pl-[10px]">

                <button>

                  <CalendarMonthIcon sx={{ fontSize: "25px", color: "#111111" }} />

                </button>

                <h1 className="pl-[10px]">Pick Date</h1>

              </div>

            </div>

          </div>

        </div>
        {/* Events Grid - 3 cards per row with category headers */}
        <div className="p-3 sm:p-[20px]">
          
          {/* Category Headers for 3 columns */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 lg:gap-[20px] mb-6">
            <div className="flex items-center justify-center gap-2">
              <CircleIcon sx={{ fontSize: "16px", color: "#0122F5" }} />
              <span className="text-sm sm:text-base font-medium text-gray-700">Up-Coming Events</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CircleIcon sx={{ fontSize: "16px", color: "#1ABF46" }} />
              <span className="text-sm sm:text-base font-medium text-gray-700">Pending Events</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CircleIcon sx={{ fontSize: "16px", color: "#BF1A1A" }} />
              <span className="text-sm sm:text-base font-medium text-gray-700">Closed Events</span>
            </div>
          </div>

          {/* Mobile/Tablet Category Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <CircleIcon sx={{ fontSize: "16px", color: "#0122F5" }} />
              <span className="text-sm sm:text-base font-medium text-gray-700">Up-Coming Events</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleIcon sx={{ fontSize: "16px", color: "#1ABF46" }} />
              <span className="text-sm sm:text-base font-medium text-gray-700">Pending Events</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleIcon sx={{ fontSize: "16px", color: "#BF1A1A" }} />
              <span className="text-sm sm:text-base font-medium text-gray-700">Closed Events</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[20px]">
            {/* All Upcoming Events */}
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
            
            {/* All Pending Events */}
            {pendingEvents.map((event) => (
              <EventCard key={event._id} event={event} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
            
            {/* All Closed Events */}
            {closedEvents.map((event) => (
              <EventCard key={event._id} event={event} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveDrawer>
  );
}
