import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  User,
  LogIn,
  Heart,
  BookOpenText,
  LogOut,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import UserAvatar from "./UserAvatar";
import "./HamburgerMenu.scss";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNav = (path, mode) => {
    navigate(path, { state: { startInSignUp: mode === "signup" } });
    setIsOpen(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error signing out: " + error.message);
    } else {
      navigate("/");
      if (setIsOpen) setIsOpen(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your favorite cocktails. This cannot be undone.",
    );

    if (confirmDelete) {
      try {
        const { error: dataError } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id);

        if (dataError) throw dataError;

        const { error: authError } = await supabase.auth.signOut();

        if (authError) throw authError;
        setIsOpen(false);
        navigate("/");
        alert("Account data deleted and you have been signed out.");
      } catch (error) {
        console.error("Error during deletion:", error.message);
        alert("Something went wrong. Please try signing out manually.");
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 2.0,
          duration: 0.8,
          ease: "easeOut",
        }}
      ></motion.div>
      <button className="hamburger-trigger" onClick={toggleMenu}>
        <Menu size={32} color={isOpen ? "transparent" : "#00ced1"} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            <motion.div
              className="menu-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="drawer-header">
                {user ? (
                  <div className="user-section">
                    <UserAvatar
                      name={user.user_metadata?.full_name}
                      size="50px"
                    />
                    <span className="user-name-text">
                      {user.user_metadata?.full_name}
                    </span>
                  </div>
                ) : (
                  <h2 className="vivid-logo">VIVID</h2>
                )}
              </div>

              <div className="drawer-links">
                <button onClick={() => handleNav("/login", "signin")}>
                  <LogIn size={20} /> <span>Sign In</span>
                </button>
                <button onClick={() => handleNav("/signup", "signup")}>
                  <User size={20} /> <span>Create Account</span>
                </button>
                <hr className="divider" />
                <button onClick={() => handleNav("/favorites")}>
                  <Heart size={20} /> <span>My Favorites</span>
                </button>
                <button onClick={() => handleNav("/history")}>
                  <BookOpenText size={20} /> <span>History</span>
                </button>
              </div>

              {user && (
                <div className="auth-controls">
                  <button onClick={handleSignOut} className="sign-out-btn">
                    <LogOut size={18} /> <span>Sign Out</span>
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="delete-account-btn"
                  >
                    <Trash2 size={16} /> <span>Delete Account</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
