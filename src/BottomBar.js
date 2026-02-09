import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Heart, Search } from "lucide-react";
import { motion } from "framer-motion";
import "./BottomBar.scss";

const BottomBar = () => {
  const navigate = useNavigate();

  return (
    <motion.nav
      className="bottom-bar"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 2.2,
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <nav className="bottom-bar">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Home size={24} strokeWidth={1.5} />{" "}
          <span className="label">Home</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Heart size={24} strokeWidth={1.5} />
          <span className="label">Favorites</span>
        </NavLink>

        <button
          className="nav-item"
          onClick={() => {
            /* Search Logic later */
          }}
        >
          <Search size={24} strokeWidth={1.5} />
          <span className="label">Search</span>
        </button>
      </nav>
    </motion.nav>
  );
};

export default BottomBar;
