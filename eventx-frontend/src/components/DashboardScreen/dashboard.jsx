import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Import all necessary services
import {
  getSummaryService,
  listEventsService,
  getSalesTrendService,
} from "../services/authService";
import Header from "./header";
import ResponsiveDrawer from "./maindashboard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EventDetail from "./eventdetail";
import NotificationDetail from "./notificationdetail";
import dancing from "../../assets/row1/Dancing.png";
import transaction from "../../assets/row1/Transaction.png";
import ticket from "../../assets/row1/Movie Ticket.svg";
import NetSalesCard from "./linechart";
import CustomerEngagementCard from "./piechart";
import SeatHeatmap from "./heatmap";
import { useAuth } from "../Auth/AuthContext";
import { NotificationContext } from "../context/NotificationContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications, fetchNotifications } = useContext(NotificationContext);

  // State for all dynamic data fetched from the API
  const [summary, setSummary] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [latestEvent, setLatestEvent] = useState(null);
  const [salesTrend, setSalesTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all dashboard data concurrently for better performance
        const [summaryRes, allEventsRes, upcomingEventsRes, salesTrendRes] =
          await Promise.all([
            getSummaryService(),
            listEventsService(), // Get all events for the pie chart
            listEventsService({
              status: "published",
              limit: 10,
              sortBy: "date:asc",
            }), // Get upcoming events
            getSalesTrendService(),
          ]);

        setSummary(summaryRes.data);
        setAllEvents(allEventsRes.data.items || []);
        setSalesTrend(salesTrendRes.data);

        const upcoming = upcomingEventsRes.data.items || [];
        // Get the next 5 upcoming events for the sidebar
        setUpcomingEvents(upcoming.slice(0, 5));
        // Get the single most recent upcoming event for the heatmap
        setLatestEvent(upcoming[0]);

        // Fetch notifications
        await fetchNotifications();
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchNotifications]);

  // Get the most recent 3 notifications for the dashboard
  const dashboardNotifications = notifications.slice(0, 3);
  if (loading) {
    return (
      <ResponsiveDrawer>
        <div className="p-4 sm:p-10 text-center font-semibold text-gray-500">
          Loading Dashboard...
        </div>
      </ResponsiveDrawer>
    );
  }

  return (
    <ResponsiveDrawer>
      <div className="min-h-screen bg-[#F2F2F2] rounded-none sm:rounded-[15px] mr-0 sm:mr-2 lg:mr-[20px]">
        <div className="ml-2 sm:ml-[20px] pt-[5px] mr-2 sm:mr-[40px]">
          <Header />
        </div>
        <div className="flex flex-col xl:grid xl:grid-cols-4 gap-4 xl:gap-0 m-2 sm:m-[20px] pb-4 sm:pb-8">

          <div className="xl:col-span-3 order-1 xl:order-1">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 lg:gap-[20px]">
    
              {/* --- Summary Cards - Data from API --- */}
    
              <div className="h-[100px] flex items-center justify-start bg-[#ffffff] rounded-[1rem] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] p-2 sm:p-[5px] gap-2 sm:gap-[10px]">
    
                <div className="ml-1 sm:ml-[5px]">
                  <img
                    className="w-10 h-10 sm:w-[55px] sm:h-[55px] rounded-full"
                    src={dancing}
                    alt=""
                  />
                </div>
                <div className="text-[10px] sm:text-[12px]">

                  <div className="font-bold">EVENTS</div>

                  <div className="text-lg sm:text-[24px] text-[#1968AF] font-bold">
                    {summary?.totalEvents || 0} events
                  </div>

                </div>

              </div>
              <div className="h-[100px] flex items-center justify-start bg-[#ffffff] rounded-[1rem] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] p-2 sm:p-[5px] gap-2 sm:gap-[10px]">
            
                <div className="ml-1 sm:ml-[5px]">
                  <img
                    className="w-10 h-10 sm:w-[55px] sm:h-[55px] rounded-full"
                    src={ticket}
                    alt=""
                  />
                </div>
            
                <div className="text-[10px] sm:text-[12px]">
                  <div className="font-bold">BOOKINGS</div>
                  <div className="text-lg sm:text-[24px] text-[#F29D38] font-bold">
                    {summary?.ticketsSold?.toLocaleString() || 0}
                  </div>
                
                </div>
              </div>
              <div className="h-[100px] flex items-center justify-start bg-[#ffffff] rounded-[1rem] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] p-2 sm:p-[5px] gap-2 sm:gap-[10px]">
            
                <div className="ml-1 sm:ml-[5px]">
                  <img
                    className="w-10 h-10 sm:w-[55px] sm:h-[55px] rounded-full"
                    src={transaction}
                    alt=""
                  />
                </div>
                <div className="text-[10px] sm:text-[12px]">
                  <div className="font-bold">REVENUE</div>
                  <div className="text-lg sm:text-[24px] text-[#197920] font-bold">
                    {summary?.revenue?.toLocaleString() || 0} LKR
                  </div>
                  
                </div>
            
              </div>
            </div>
            <div className="flex flex-col xl:flex-row mt-4 sm:mt-[20px] gap-4 xl:gap-[20px]">
            
              <div className="flex-1">
                <NetSalesCard summary={summary} trendData={salesTrend} />
              </div>
            
              {/* --- Pass all events to the engagement card --- */}
              <div className="flex-1">
                <CustomerEngagementCard events={allEvents} />
              </div>
              
            </div>
            
            <div className="grid grid-cols-1 mt-4 sm:mt-[20px]">
    
              <div>
                <SeatHeatmap event={latestEvent} />
              </div>
              
            </div>
          </div>
          <div className="xl:col-span-1 order-2 xl:order-2 ml-0 xl:ml-5">
            
            <div className="bg-white rounded-[10px] pb-2 sm:pb-[10px] mb-4 sm:mb-[30px]">
            
              <div className="flex items-center justify-between p-4 sm:p-[20px]">
                <div className="text-sm sm:text-base font-medium">UPCOMING EVENTS</div>
                <div>
                  <button>
                    <ArrowRightAltIcon sx={{ fontSize: { xs: "30px", sm: "50px" } }} />
                  </button>
                </div>
              </div>
      
              {upcomingEvents.map((event) => (
                <EventDetail key={event._id} event={event} />
              ))}
            
              <div className="flex items-center justify-end pt-2 sm:pt-[10px] pr-4 sm:pr-[20px]">
                <button>
                  <u className="text-[10px] sm:text-[12px]">see All</u>
                </button>
              </div>
              
            </div>
            
            <div>
            
              <div className="bg-white rounded-[10px] pb-2 sm:pb-[10px]">
                <div className="flex items-center justify-between p-4 sm:p-[20px]">
                  <div className="text-sm sm:text-base font-medium">Notifications</div>
                  <div>
                    <button>
                      <ArrowRightAltIcon sx={{ fontSize: { xs: "30px", sm: "50px" } }} />
                    </button>
                  </div>
                </div>
                {dashboardNotifications.map((notification, index) => (
                  <NotificationDetail
                    key={notification._id || index}
                    notification={notification}
                  />
                ))}
                <hr className="ml-4 sm:ml-[20px] mr-4 sm:mr-[20px]" />
                <div className="flex items-center justify-end pt-2 sm:pt-[10px] pr-4 sm:pr-[20px]">
                  <button onClick={() => navigate('/notifications')}>
                    <u className="text-[10px] sm:text-[12px]">see All</u>
                  </button>
                </div>
             
              </div>
       
            </div>
     
          </div>          
        </div>

      </div>

    </ResponsiveDrawer>
  );
}
