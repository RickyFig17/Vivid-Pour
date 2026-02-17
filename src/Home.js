import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.scss";
import { Navigate, useNavigate } from "react-router-dom";

const videoList = [
  {
    desktop: "/videos/bluepour_desktop.mp4",
    mobile: "/videos/purplepour_mobile.mp4",
    color_desktop: "#00ced1",
    color_mobile: "#ab00d1",
  },
  {
    desktop: "/videos/icecubes_desktop.mp4",
    mobile: "/videos/jigger_mobile.mp4",
    color_desktop: "#ffaa00",
    color_mobile: "#ffaa00",
  },
  {
    desktop: "/videos/redpour_desktop.mp4",
    mobile: "/videos/wine_mobile.mp4",
    color_desktop: "#ff4d4d",
    color_mobile: "#ff4d4d",
  },
  {
    desktop: "/videos/smoke_desktop.mp4",
    mobile: "/videos/bartenderpour_mobile.mp4",
    color_desktop: "#ea7e03",
    color_mobile: "#ffaa00",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextVideo = () => {
    setIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const currentVideo = isMobile
    ? videoList[index].mobile
    : videoList[index].desktop;

  return (
    <div className="home-container">
      <div className="video-wrapper">
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideo}
            src={currentVideo}
            autoPlay
            muted
            playsInline
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
