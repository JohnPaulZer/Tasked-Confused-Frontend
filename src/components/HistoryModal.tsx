import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal"; 
import { FaCalendarAlt, FaFilter, FaCheckCircle } from "react-icons/fa";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 👇 Added isCompleted to the interface for type safety during filtering
interface CompletedTask {
  _id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  isCompleted: boolean; 
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState<CompletedTask[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", { withCredentials: true });
      
      // Ensure we type the incoming array
      const allTasks: CompletedTask[] = response.data.tasks || response.data;
      
      // Filter for completed tasks only using the typed array
      const completedOnly = allTasks.filter((t) => t.isCompleted);
      
      // Sort by date (newest first)
      completedOnly.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setTasks(completedOnly);
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesDate = filterDate ? task.date.startsWith(filterDate) : true;
    const matchesCategory = filterCategory === "All" ? true : task.category === filterCategory;
    return matchesDate && matchesCategory;
  });

  const categories = ["All", ...new Set(tasks.map(t => t.category))];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Task History"
      footer={
        <button 
          onClick={onClose}
          className="px-6 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md w-full"
        >
          Close
        </button>
      }
    >
      <div className="flex flex-col gap-4 min-h-150 max-h-[60vh]">
        
        {/* --- FILTERS SECTION --- */}
        <div className="flex gap-2 mb-2">
          <div className="relative flex-1">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50" />
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-primary/20 bg-secondary text-primary text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="relative flex-1">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50" />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-primary/20 bg-secondary text-primary text-sm focus:outline-none focus:border-primary appearance-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- LIST SECTION --- */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-3">
          {loading ? (
            <p className="text-center text-primary/60 mt-10">Loading history...</p>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center mt-10 opacity-60">
              <FaCheckCircle className="text-4xl mx-auto mb-2" />
              <p>No completed tasks found.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div 
                key={task._id} 
                className="bg-primary/5 p-3 rounded-lg border border-primary/10 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold text-primary text-left line-through opacity-70">{task.title}</h4>
                  <p className="text-xs text-primary/60 text-left">
                    {new Date(task.date).toLocaleDateString()} • {task.time}
                  </p>
                </div>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {task.category}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default HistoryModal;