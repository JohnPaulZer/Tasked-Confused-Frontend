import BackButton from "@/components/common/BackButton";
import Header from "@/components/common/Header";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ActCard from "@/components/task/ActCard";
import DateSched from "@/components/task/DateSched";
import { useEffect, useState } from "react";
import { FaBook, FaDumbbell, FaRegLightbulb } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdSportsVolleyball } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";

// Page to select task category and navigate to AddTask
function CreateTask() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Navigate to AddTask page with selected category
  const handleCategoryClick = (categoryTitle: string) => {
    navigate("/AddTask", { state: { category: categoryTitle } });
  };

  if (isLoading) return <SkeletonLoader type="createtask" />;

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8">
      {/* ... (Keep your SVG Background code here) ... */}
      <div className="absolute inset-0 z-0 pt-20">
        {/* Your SVG code */}
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

      <div>
        <Header logo={Logo} title="Create New Task" />
      </div>

      <div>
        <BackButton />
      </div>
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

      {/* 3. Update onClick to use the helper function */}
      <div>
        <ActCard
          onClick={() => handleCategoryClick("Idea")}
          icon={<FaRegLightbulb className="text-primary text-4xl shrink-0" />}
          title="Idea"
          subtitle="0 Task"
        />
        <ActCard
          onClick={() => handleCategoryClick("Foods")}
          icon={<IoFastFoodSharp className="text-primary text-4xl shrink-0" />}
          title="Foods"
          subtitle="0 Task"
        />
        <ActCard
          onClick={() => handleCategoryClick("Sports")}
          icon={
            <MdSportsVolleyball className="text-primary text-4xl shrink-0" />
          }
          title="Sports"
          subtitle="0 Task"
        />
        <ActCard
          onClick={() => handleCategoryClick("Exercise")}
          icon={<FaDumbbell className="text-primary text-4xl shrink-0" />}
          title="Exercise"
          subtitle="0 Task"
        />
        <ActCard
          onClick={() => handleCategoryClick("Study")}
          icon={<FaBook className="text-primary text-4xl shrink-0" />}
          title="Study"
          subtitle="0 Task"
        />
      </div>
    </div>
  );
}

export default CreateTask;
