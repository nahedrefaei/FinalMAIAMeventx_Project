import React, { useEffect, useState } from 'react';
import { getDemographicsService, getSummaryService } from '../services/authService'; // Assuming you also have a summary service
import Filter from "../../assets/manageevents/Tune.svg";
import Search from "../../assets/Search.png";
import People from "../../assets/People.svg";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Users from "../../assets/Users.svg";
import AgeStatsCard from "./card";
import Gender from "../../assets/attende/Gender.svg";
import GoogleGroups from "../../assets/attende/Google Groups.svg";
import Age from "../../assets/attende/Age.svg";
import PlaceMaker from "../../assets/attende/Place Marker.svg";
import AttendeeLocationsChart from "./barchartatt";
import AttendeeInterestsChart from "./interests";
import AttendeeAgesChart from "./age";
import ResponsiveDrawer from "../DashboardScreen/maindashboard";
import upArrow from "../../assets/attende/up.svg"; // Assuming you only need one arrow for now

export default function AllAttendee() {
  const [demographics, setDemographics] = useState(null);
  const [summary, setSummary] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both summary and demographics data at the same time
        const [summaryRes, demographicsRes] = await Promise.all([
          getSummaryService(),
          getDemographicsService(),
        ]);
        setSummary(summaryRes.data);
        setDemographics(demographicsRes.data);
      } catch (err) {
        console.error("Failed to load analytics data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // This effect runs after the demographics data has been fetched
  useEffect(() => {
    if (demographics && summary) {
      const totalAttendees = summary.uniqueAttendees || 1; // Avoid division by zero

      // Helper function to find the category with the highest count
      const findTopCategory = (dataObject) => {
        if (!dataObject || Object.keys(dataObject).length === 0) {
          return ["N/A", 0];
        }
        return Object.entries(dataObject).reduce((a, b) => (a[1] > b[1] ? a : b));
      };
      
      const [topAgeRange, topAgeValue] = findTopCategory(demographics.ageBuckets);
      const [topGender, topGenderValue] = findTopCategory(demographics.byGender);
      const [topLocation, topLocationValue] = findTopCategory(demographics.byLocation);
      const [topInterest, topInterestValue] = findTopCategory(demographics.byInterests);

      const newCards = [
        {
          title: "DOMINANT AGE GROUP",
          ageRange: topAgeRange,
          percentage: ((topAgeValue / totalAttendees) * 100).toFixed(0) + "%",
          value: topAgeValue,
          image: Age,
          icon: upArrow,
        },
        {
          title: "DOMINANT GENDER",
          ageRange: topGender,
          percentage: ((topGenderValue / totalAttendees) * 100).toFixed(0) + "%",
          value: topGenderValue,
          image: Gender,
          icon: upArrow,
        },
        {
          title: "TOP ATTENDEE LOCATION",
          ageRange: topLocation,
          percentage: ((topLocationValue / totalAttendees) * 100).toFixed(0) + "%",
          value: topLocationValue,
          image: PlaceMaker,
          icon: upArrow,
        },
        {
          title: "TOP ATTENDEE INTEREST",
          ageRange: topInterest,
          percentage: ((topInterestValue / totalAttendees) * 100).toFixed(0) + "%",
          value: topInterestValue,
          image: GoogleGroups,
          icon: upArrow,
        },
      ];
      setCards(newCards);
    }
  }, [demographics, summary]);

  if (loading) {
    return (
      <ResponsiveDrawer>
        <div className="text-center p-10 font-semibold text-gray-500">Loading Analytics...</div>
      </ResponsiveDrawer>
    );
  }

  return (
    <ResponsiveDrawer>
      <div className="h-full bg-[#f2f2f2] rounded-[10px] sm:rounded-[15px] mx-2 sm:mx-4 lg:mr-[20px] p-4 sm:p-[20px] lg:pl-[50px]">
        <div className="min-h-[80px] sm:h-[100px] flex flex-col sm:flex-row items-start sm:items-center justify-between mb-[20px] bg-[#ffffff] rounded-[10px] sm:rounded-[15px] shadow-[0px_0px_2px_0px_#111111] p-4 sm:p-[20px] gap-4 sm:gap-0">
          <div className="flex items-center gap-[10px]">
            <div><img src={People} alt="" className="w-6 h-6 sm:w-auto sm:h-auto" /></div>
            <div><h1 className="text-lg sm:text-[24px] font-bold">All Attendee Insights</h1></div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-[10px] w-full sm:w-auto">

            <div className="w-full sm:w-[180px] h-[42px] bg-white rounded-[8px] sm:rounded-[10px] flex items-center border-[1px] border-[#111111] gap-[10px] pl-[10px]">
              <button className="text-sm sm:text-base">Attendees: {summary?.uniqueAttendees || 0}</button>
              <img src={Users} alt="" className="w-4 h-4 sm:w-auto sm:h-auto" />
            </div>
            {/* ... other filter/search elements ... */}
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[30%_70%] gap-4 sm:gap-[20px]">
          <div className="order-2 xl:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6">
              {cards.map((card, index) => (
                <div key={index}>
                  <AgeStatsCard
                    title={card.title}
                    ageRange={card.ageRange}
                    percentage={card.percentage}
                    value={card.value}
                    image={card.image}
                    icon={card.icon}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 xl:order-2">
            <div className="mb-4 sm:mb-5">
              {/* Pass the live data to your charts as props */}
              <AttendeeLocationsChart data={demographics?.byLocation} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-[20px]">
              <div>
                <AttendeeInterestsChart data={demographics?.byInterests} />
              </div>
              <div>
                <AttendeeAgesChart data={demographics?.ageBuckets} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveDrawer>
  );
}