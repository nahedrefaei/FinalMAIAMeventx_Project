import image1 from "../../assets/events/image 7.svg"
import image2 from "../../assets/events/image 8.svg"
import image3 from "../../assets/events/image 9.svg"
import image4 from "../../assets/events/image 10.svg"
const images = [image1, image2, image3, image4];
export default function EventDetail({event}) {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    return(
        <div className="flex items-center justify-start bg-[#F7F7F7] rounded-[1rem] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] ml-2 sm:ml-[20px] mr-2 sm:mr-[20px] mb-2 sm:mb-[10px] p-1 sm:p-[5px] gap-2 sm:gap-[10px]">
          <div className="ml-1 sm:ml-[5px]"><img className="w-8 h-8 sm:w-[36px] sm:h-[36px] rounded-full"src={randomImage} alt="" /></div>
          <div className="text-[10px] sm:text-[12px]">
            <div className="truncate">Event: {event.title}</div>
            <div className="truncate">Date: {event.date}</div>
          </div>
        </div>
    )
}