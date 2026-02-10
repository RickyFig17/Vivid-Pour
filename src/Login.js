import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "./supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(
    location.state?.startInSignUp || false,
  );
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // --- SIGN UP LOGIC ---
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        alert("Check your email for a confirmation link!");
      } else {
        // --- SIGN IN LOGIC ---
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/"); // Redirect to home on success
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.startInSignUp !== undefined) {
      setIsSignUp(location.state.startInSignUp);
    }
  }, [location.state]);

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h2 className="vivid-glow-text">
            {isSignUp ? "Join the Club" : "Welcome Back"}
          </h2>
          <p>
            {isSignUp
              ? "Create an account to save your favorites."
              : "Sign in to access your custom bar."}
          </p>
        </div>

        <form className="login-form" onSubmit={handleAuth}>
          <AnimatePresence mode="popLayout">
            {isSignUp && (
              <motion.div
                className="input-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <User size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="input-group">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <Loader2 className="spinner" size={20} />
            ) : (
              <>
                {isSignUp ? "Create Account" : "Sign In"}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            className="toggle-auth"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "New here? Create an account"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
