import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.scss";
import { Navigate, useNavigate } from "react-router-dom";

const videoList = [
  "/videos/bluepour.mp4",
  "/videos/icecubes.mp4",
  "/videos/redpour.mp4",
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const nextVideo = () => {
    setIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  return (
    <div className="home-container">
      <div className="video-wrapper">
        <AnimatePresence mode="wait">
          <motion.video
            key={videoList[index]}
            src={videoList[index]}
            autoPlay
            muted
            playsInline
            webkit-playsinline="true"
            onEnded={nextVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="background-video"
          />
        </AnimatePresence>
        <div className="video-overlay"></div>
      </div>

      <motion.div
        className="hero-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h1 className="vivid-title">VIVID POUR</h1>
        <p className="vivid-subtitle">The Art of the Cocktail</p>
        <button
          className="explore-btn"
          onClick={() => navigate("/two-oz-cocktails")}
        >
          Start Exploring
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
