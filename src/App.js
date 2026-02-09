import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Home from "./Home";
import Header from "./Header";
import SplashScreen from "./SplashScreen";
import BottomBar from "./BottomBar";
import CocktailCategory from "./CocktailCategory";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [direction, setDirection] = useState(0);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [searchTerm, setSearchTerm] = useState("");

  const pathOrder = [
    "/",
    "/two-oz-cocktails",
    "/tall-drinks",
    "/highballs",
    "/cream-drinks",
    "/martinis",
    "/sours",
    "/shooters",
    "/wine-cocktails",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const newIdx = pathOrder.indexOf(location.pathname);
    const oldIdx = pathOrder.indexOf(prevPath);

    if (newIdx !== oldIdx) {
      setDirection(newIdx > oldIdx ? 1 : -1);
      setPrevPath(location.pathname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, prevPath]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "-100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        )}
      </AnimatePresence>
      <div
        className="content-wrapper"
        style={{ overflowX: "hidden", position: "relative" }}
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={location.pathname}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route
                path="/two-oz-cocktails"
                element={
                  <CocktailCategory
                    type="two-oz"
                    title="2oz Cocktails"
                    searchTerm={searchTerm}
                  />
                }
              />
              <Route
                path="/tall-drinks"
                element={
                  <CocktailCategory
                    type="tall-drinks"
                    title="Tall Drinks"
                    searchTerm={searchTerm}
                  />
                }
              />

              <Route
                path="/highballs"
                element={
                  <CocktailCategory
                    type="highball"
                    title="Highballs"
                    searchTerm={searchTerm}
                  />
                }
              />

              <Route
                path="/cream-drinks"
                element={
                  <CocktailCategory
                    type="cream"
                    title="Cream Drinks"
                    searchTerm={searchTerm}
                  />
                }
              />
              <Route
                path="/martinis"
                element={
                  <CocktailCategory
                    type="martini"
                    title="Martinis"
                    searchTerm={searchTerm}
                  />
                }
              />
              <Route
                path="/sours"
                element={
                  <CocktailCategory
                    type="sour"
                    title="Sours"
                    searchTerm={searchTerm}
                  />
                }
              />
              <Route
                path="/shooters"
                element={
                  <CocktailCategory
                    type="shooter"
                    title="Shooters"
                    searchTerm={searchTerm}
                  />
                }
              />
              <Route
                path="/wine-cocktails"
                element={
                  <CocktailCategory
                    type="wine-cocktail"
                    title="Wine Cocktails"
                    searchTerm={searchTerm}
                  />
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomBar />
    </div>
  );
}

export default App;
