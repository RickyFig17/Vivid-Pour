import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Heart, Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthPrompt } from "./AuthContext";
import UserAvatar from "./UserAvatar";
import "./BottomBar.scss";

const BottomBar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthPrompt();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);
    navigate("/search");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      navigate("/search");
    }
  };

  useEffect(() => {
    if (location.pathname !== "/search") {
      setShowSearch(false);
    }
  }, [location.pathname]);

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
      <AnimatePresence>
        {showSearch && (
          <>
            <motion.div
              className="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowSearch(false);
                setSearchTerm("");
              }}
            />
            <motion.div
              className="mobile-search-overlay"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search cocktails..."
                  autoFocus
                  value={searchTerm || ""}
                  onChange={handleSearchChange}
                />
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchTerm("");
                  }}
                ></button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="nav-menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Home size={24} strokeWidth={1.5} />
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

        <NavLink to={user ? "/profile" : "/login"} className="nav-item">
          {user ? (
            <UserAvatar name={user.user_metadata?.full_name} size="28px" />
          ) : (
            <User size={24} />
          )}
          <span className="label">{user ? "Profile" : "Sign In"}</span>
        </NavLink>

        <button
          className={`nav-item ${showSearch ? "active" : ""}`}
          onClick={handleSearchClick}
        >
          <Search size={24} strokeWidth={1.5} />
          <span className="label">Search</span>
        </button>
      </div>
    </motion.nav>
  );
};

export default BottomBar;
