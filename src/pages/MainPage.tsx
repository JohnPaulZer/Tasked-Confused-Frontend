import DateSched from "@/components/DateSched";
import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import TaskCard from "@/components/TaskCard";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";

function MainPage() {
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 pt-64">
        <svg
          viewBox="0 0 412 690"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-1.16937 43.1118C44.3306 181.112 296.434 -67.5257 432.331 18.6118C568.227 104.749 546.727 606.974 410.831 693.112C274.934 779.249 134.727 779.249 -1.16937 693.112C-137.066 606.974 -46.6694 -94.8882 -1.16937 43.1118Z"
            fill="#CDB885"
          />
        </svg>
      </div>

      {/* Header */}
      <Header logo={Logo} title={currentDate} />

      <div className="relative z-10">
        <h1 className="text-3xl text-secondary font-serif font-bold text-left px-5">
          <span className="text-5xl">Hello! </span>
          <br />
          Good day, JOHN PAUL👋
        </h1>

        {/* Task Header */}
        <div className="flex justify-between items-end mt-12 font-serif px-5 text-secondary">
          <div>
            <p className="text-2xl font-bold">Today</p>
            <p className="text-base opacity-90">5 tasks</p>
          </div>

          <div className="flex items-end relative">
            <PrimaryButton
              content="Add Task"
              bgColorClass="bg-primary"
              colorClass="text-secondary"
              widthClass="w-30"
              className="text-xl whitespace-nowrap"
              onClick={() => navigate("/CreateTask")}
            />
          </div>
        </div>

        <>
          <DateSched
            initialDate={new Date()}
            daysToShow={30}
            onSelectDate={(date) => console.log("Selected date:", date)}
          />
        </>
        <div className="mt-5 px-5">
          <h1 className="text-2xl font-bold text-primary font-serif">My Tasks</h1>
          <TaskCard time="6:00 - 9:00 am" title="Fitness" description="Exercise in the gym"  onEdit={() => console.log("Edit clicked")} onDelete={() => console.log("Delete clicked")}  onToggleComplete={(checked) => console.log("Completed:", checked)}/>
            <TaskCard time="6:00 - 9:00 am" title="Fitness" description="Exercise in the gym"  onEdit={() => console.log("Edit clicked")} onDelete={() => console.log("Delete clicked")}  onToggleComplete={(checked) => console.log("Completed:", checked)}/>
              <TaskCard time="6:00 - 9:00 am" title="Fitness" description="Exercise in the gym"  onEdit={() => console.log("Edit clicked")} onDelete={() => console.log("Delete clicked")}  onToggleComplete={(checked) => console.log("Completed:", checked)}/>
                <TaskCard time="6:00 - 9:00 am" title="Fitness" description="Exercise in the gym"  onEdit={() => console.log("Edit clicked")} onDelete={() => console.log("Delete clicked")}  onToggleComplete={(checked) => console.log("Completed:", checked)}/>
                  <TaskCard time="6:00 - 9:00 am" title="Fitness" description="Exercise in the gym"  onEdit={() => console.log("Edit clicked")} onDelete={() => console.log("Delete clicked")}  onToggleComplete={(checked) => console.log("Completed:", checked)}/>
                    <TaskCard time="6:00 - 9:00 am" title="Fitness" description="Exercise in the gym"  onEdit={() => console.log("Edit clicked")} onDelete={() => console.log("Delete clicked")}  onToggleComplete={(checked) => console.log("Completed:", checked)}/>

        </div>
      </div>
      
    </div>
    
  );
}

export default MainPage;