import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPerEventAnalyticsService } from '../services/authService';
import Filter from "../../assets/manageevents/Tune.svg";
import Search from "../../assets/Search.png";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArrowLeft } from "lucide-react";
import Users from "../../assets/Users.svg";
import AttendeeAgeLollipopChart from "./lollipopchart";
import AttendeeLocationsChart from "./singlebarchart";
import Engagment from "./engagment";
import AttendeeLocations from "./tablelocationn";
import AttendeeInterestsChart from "./singlepiechart";
import ResponsiveDrawer from "../DashboardScreen/maindashboard";

export default function PerEvent() {
  const { eventId } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        if (!eventId) return;
        const { data } = await getPerEventAnalyticsService(eventId);
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load per-event analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [eventId]);

  if (loading) {
    return <ResponsiveDrawer><div className="p-10 text-center">Loading Analytics...</div></ResponsiveDrawer>;
  }

  if (!analytics) {
    return <ResponsiveDrawer><div className="p-10 text-center text-red-500">Could not load analytics for this event.</div></ResponsiveDrawer>;
  }

  // Format date and time for display
  const eventDate = new Date(analytics.event.date).toLocaleDateString();
  const eventTime = new Date(analytics.event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <ResponsiveDrawer>
      <div className="h-full bg-[#F2F2F2] rounded-[15px] mr-[20px] ">
        <div className="bg-[#ffffff] rounded-[15px] rounded-bl-[0px] rounded-br-[0px] pt-[20px] pb-[5px] pl-[30px] pr-[30px]">
          <div className="flex justify-between mb-[20px]">
            <div className="flex gap-[10px]">
              <div className="mr-[10px] mt-[8px]">
                <Link to="/manage-events" className="p-1 rounded-full border-[3px] border-[#111111] hover:bg-[#111111] hover:text-white block">
                  <ArrowLeft size={30} />
                </Link>
              </div>
              <div>
                <h1 className="text-[24px] font-extrabold">Attendee Insights - {analytics.event.title}</h1>
                <div className="text-sm space-y-2 ml-[20px]">
                  <p>
                    <span className="font-thin text-[#111111]">Event Venue :</span>{" "}
                    <span className="font-thin">{analytics.event.venue}</span>
                  </p>
                  <p>
                    <span className="font-thin text-[#111111]">Event Date :</span>{" "}
                    <span className="font-thin">{eventDate}</span>
                  </p>
                  <p>
                    <span className="font-thin text-[#111111]">Event Time :</span>{" "}
                    <span className="font-thin">{eventTime}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className=" ">
              <div className="w-[400px] h-[42px] bg-white rounded-[10px] flex items-center border-[1px] border-[#111111] gap-[10px] pl-[10px]">
                <button><img src={Search} alt="" /></button>
                <input type="text" placeholder="Search..." />
              </div>
              <div className="flex items-center gap-[10px] ml-[90px] mt-[30px] text-[#666666]">
                <div className="w-[180px] h-[42px] bg-white rounded-[10px] flex items-center border-[1px] border-[#111111] gap-[10px] pl-[10px] ">
                  <button>Attendees: {analytics.ticketsSold}</button>
                  <img src={Users} alt="" />
                </div>
                <div className="w-[120px] h-[42px] bg-white rounded-[10px] flex items-center border-[1px] border-[#111111] gap-[10px] pl-[10px]">
                  <img src={Filter} alt="" />
                  <button className="">filter</button>
                  <ArrowDropDownIcon sx={{ fontSize: '50px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-[20px] pl-[30px] pr-[30px]">
          <div>
            <div className="h-[350px] w-full bg-white shadow rounded-2xl p-4 mt-[20px]">
              {/* Pass live data to your charts */}
              <AttendeeAgeLollipopChart data={analytics.demographics?.ageBuckets} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px] mb-[20px]">
              <div><AttendeeInterestsChart data={analytics.demographics?.byInterests} /></div>
              <div><AttendeeLocationsChart data={analytics.demographics?.byLocation} /></div>
            </div>
          </div>
          <div>
            <div className="mt-[20px]">
              {/* Note: The API doesn't provide social media stats, but we can pass the check-in count */}
              <Engagment checkedInCount={analytics.checkedIns} />
            </div>
            <div className="mt-[20px]">
              <AttendeeLocations data={analytics.demographics?.byLocation} />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveDrawer>
  );
}