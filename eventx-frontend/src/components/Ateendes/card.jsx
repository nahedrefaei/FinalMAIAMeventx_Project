import React from "react";
import upArrow from "../../assets/attende/up.svg"
import downArrow from "../../assets/attende/down.png"

const AgeStatsCard = ({ title, ageRange, percentage, value, image, icon }) => {
  // check if icon is upArrow
  const isIncrease = icon.includes(upArrow); // assuming your up arrow image has "up" in its filename

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-3 w-[320px] mb-[20px] shadow-[0px_0px_4px_0px_#111111]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className=" text-sm font-bold uppercase">
          {title}
        </span>
        <img src={image} alt="header-icon" className="w-5 h-5" />
      </div>

      {/* Main Content */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">{ageRange}</h2>
          <div
            className={`flex items-center gap-1 mt-2 pl-7 ${
              isIncrease ? "text-green-500" : "text-red-500"
            }`}
          >
            <img src={icon} alt="trend-icon" className="w-4 h-4" />
            <span className="text-sm ">
              {percentage} {isIncrease ? "Increase" : "Decrease"}
            </span>
          </div>
        </div>
        <span className="text-2xl font-thin">{value}</span>
      </div>
    </div>
  );
};

export default AgeStatsCard;
