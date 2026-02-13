
import Logo from "../images/Logo.png";
import DateSched from "@/components/DateSched";
import { FaRegLightbulb } from "react-icons/fa";
import ActCard from "@/components/ActCard";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdSportsVolleyball } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";


function CreateTask() {
  
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8">
      {/* Background SVG */}
        <div className="absolute inset-0 z-0 pt-20">
            <svg
                viewBox="0 0 412 930"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M1.69312 261.261C1.69316 33.4596 413.475 147.687 413.475 11.9196C413.475 -123.848 542.906 945 413.475 945C284.043 945 140.503 945 1.69309 945C-137.116 945 1.69308 489.063 1.69312 261.261Z"
                fill="#CDB885"
                />
            </svg>
        </div>

        {/* Header */}
        <div>
        <Header logo={Logo} title="Create New Task" />
        </div>
        
        <div><BackButton/></div>    
        <div>
            <DateSched
            initialDate={new Date()}
            daysToShow={30}
            onSelectDate={(date) => console.log("Selected date:", date)}
          />
        </div>

        <div className="relative mt-8 px-5">
            <h1 className="text-primary text-2xl font-serif">Choose Activity</h1>
        </div>
        <div>
            <ActCard icon={<FaRegLightbulb className="text-primary text-4xl shrink-0" />} title="Idea" subtitle="0 Task" />
            <ActCard icon={<IoFastFoodSharp className="text-primary text-4xl shrink-0" />} title="Foods" subtitle="0 Task" />
            <ActCard icon={<MdSportsVolleyball className="text-primary text-4xl shrink-0" />} title="Sports" subtitle="0 Task" />
            <ActCard icon={<FaDumbbell className="text-primary text-4xl shrink-0" />} title="Exercise" subtitle="0 Task" />
            <ActCard icon={<FaBook className="text-primary text-4xl shrink-0" />} title="Study" subtitle="0 Task" />

        </div>
    </div>
  );
}

export default CreateTask;