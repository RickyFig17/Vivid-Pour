import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import "./History.scss";

const History = () => {
  const navigate = useNavigate();

  return (
    <div className="history-placeholder">
      <div className="content-card">
        <BookOpen size={60} className="icon-glow" />
        <h1>The Archives</h1>
        <div className="badge">Coming Soon</div>

        <button onClick={() => navigate("/")} className="back-btn">
          <ArrowLeft size={18} /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default History;
