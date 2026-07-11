import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Clock, Video, BookOpen, Presentation, Code, GraduationCap,
  Calendar, Check, Flag, Target, PlayCircle, PlusCircle, Search, Circle
} from 'lucide-react';

const TaskCard = ({ day, focus, tasks, resources }) => {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
      className="bg-white border border-[#E5E7EB] rounded-xl p-5 mb-4 relative flex flex-col"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[15px] font-bold text-[#111827]">Day {day}: {focus}</h3>
      </div>
      
      <div className="flex flex-col gap-2 mb-4">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-start gap-2 text-xs font-medium text-[#4B5563]">
            <Circle size={14} className="text-[#9CA3AF] shrink-0 mt-0.5" />
            <span className="leading-relaxed">{task}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-auto border-t border-[#F3F4F6] pt-3">
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Learning Resources (Search queries)</p>
        <div className="flex flex-wrap gap-2">
          {resources.map((res, i) => {
            const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(res)}`;
            return (
              <a key={i} href={searchUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-md text-[11px] font-bold text-[#2563EB] transition-colors">
                <Search size={12} />
                {res}
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const PrepPlanPage = () => {
  const [prepPlan, setPrepPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [duration, setDuration] = useState(5);
  // We will store the active analysis ID in state rather than just local storage
  const [activeAnalysisId, setActiveAnalysisId] = useState(localStorage.getItem('avenir_analysis_id'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const initPage = async () => {
      if (!token) {
        setFetching(false);
        return;
      }

      let currentId = activeAnalysisId;

      // If no ID is in local storage, fetch the latest analysis from history
      if (!currentId) {
        try {
          const histRes = await fetch(`${import.meta.env.VITE_API_URL}/users/history`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (histRes.ok) {
            const histData = await histRes.json();
            if (histData.analyses && histData.analyses.length > 0) {
              currentId = histData.analyses[0]._id;
              setActiveAnalysisId(currentId);
            }
          }
        } catch (e) {
          console.error("Failed to fetch history:", e);
        }
      }

      if (!currentId) {
        setFetching(false);
        return;
      }

      // Now fetch the prep plan for the currentId
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/prep/analysis/${currentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPrepPlan(data);
        }
      } catch (err) {
        console.error("Failed to fetch plan:", err);
      } finally {
        setFetching(false);
      }
    };

    initPage();
  }, [token]);

  const generatePlan = async () => {
    if (!activeAnalysisId || !token) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/prep/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ analysisId: activeAnalysisId, duration: Number(duration) })
      });
      if (res.ok) {
        const data = await res.json();
        setPrepPlan(data);
      } else {
        alert('Failed to generate prep plan');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin text-[#2563EB]"><Clock size={32} /></div>
      </div>
    );
  }

  if (!activeAnalysisId) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center px-4">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#2563EB]">
          <Flag size={24} />
        </div>
        <h2 className="text-xl font-bold text-[#111827] mb-2">No Analysis Found</h2>
        <p className="text-[#6B7280] text-sm max-w-sm">
          Please upload your resume and run a Gap Analysis first to generate a personalized Prep Plan.
        </p>
      </div>
    );
  }

  if (!prepPlan) {
    return (
      <div className="animate-in fade-in flex flex-col items-center justify-center py-20 text-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8 max-w-md w-full"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-2xl flex items-center justify-center mb-6 mx-auto text-white shadow-md">
            <Target size={28} />
          </div>
          <h2 className="text-2xl font-extrabold text-[#111827] mb-2">Build Your Prep Plan</h2>
          <p className="text-sm font-medium text-[#6B7280] mb-6">
            We will use AI to analyze your missing skills and create a day-by-day curriculum.
          </p>
          
          <div className="text-left mb-6">
            <label className="block text-xs font-bold text-[#4B5563] uppercase tracking-wider mb-2">Days to Interview</label>
            <input 
              type="number" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)} 
              min="1" max="30"
              className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#D1D5DB] rounded-xl text-sm font-bold text-[#111827] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all"
            />
          </div>

          <button 
            onClick={generatePlan} 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md disabled:opacity-70"
          >
            {loading ? (
              <><Clock size={18} className="animate-spin" /> Generating Curriculum...</>
            ) : (
              <><PlayCircle size={18} /> Generate Plan</>
            )}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl lg:text-[2.2rem] font-extrabold text-[#111827] tracking-tight mb-2">
            Your Personalized Roadmap
          </h1>
          <p className="text-sm font-medium text-[#6B7280] max-w-2xl leading-relaxed">
            Based on your Gap Analysis, we've curated a {prepPlan.duration}-day preparation sprint.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] font-bold text-sm rounded-xl transition-colors shrink-0">
          <Download size={16} />
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-8">
        
        {/* Left Column - Tasks */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prepPlan.curriculum && prepPlan.curriculum.map((dayPlan, index) => (
              <TaskCard 
                key={index}
                day={dayPlan.day}
                focus={dayPlan.focus}
                tasks={dayPlan.tasks}
                resources={dayPlan.resources}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-5">
            <h3 className="text-[13px] font-bold text-[#4B5563] mb-4">Prep Statistics</h3>
            <div className="bg-white rounded-lg p-3 mb-2 flex justify-between items-center shadow-sm">
              <span className="text-xs font-medium text-[#6B7280]">Total Days</span>
              <span className="text-sm font-bold text-[#111827]">{prepPlan.duration}</span>
            </div>
            <div className="bg-white rounded-lg p-3 mb-2 flex justify-between items-center shadow-sm">
              <span className="text-xs font-medium text-[#6B7280]">Topics Covered</span>
              <span className="text-sm font-bold text-[#2563EB]">{prepPlan.curriculum?.length || 0}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#7C3AED] to-[#6366F1] rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Target size={14} className="text-white" />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase">AI Coach Tip</span>
            </div>
            <p className="text-[13px] font-medium leading-relaxed opacity-95">
              "Pace yourself! Try spending 2-3 hours on each day's focus topic and use the YouTube search links to find tutorials quickly."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrepPlanPage;
