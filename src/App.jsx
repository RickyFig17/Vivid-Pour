import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Home from "./Home";
import Header from "./Header";
import SplashScreen from "./SplashScreen";
import BottomBar from "./BottomBar";
import CocktailCategory from "./CocktailCategory";
import HamburgerMenu from "./HamburgerMenu";
import Login from "./Login";
import Favorites from "./Favorites";
import { AuthProvider } from "./AuthContext";
import History from "./History";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [direction, setDirection] = useState(0);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

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

  const toggleFavorite = (cocktail) => {
    setFavorites((prev) => {
      const isAlreadyFav = prev.find((fav) => fav.id === cocktail.id);
      if (isAlreadyFav) {
        return prev.filter((fav) => fav.id !== cocktail.id);
      } else {
        return [...prev, cocktail];
      }
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="App">
      <AuthProvider>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <HamburgerMenu />
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
                <Route path="/history" element={<History />} />
                <Route
                  path="/favorites"
                  element={
                    <Favorites
                      favorites={favorites}
                      onToggle={toggleFavorite}
                      onClear={clearFavorites}
                    />
                  }
                />
                <Route
                  path="/category/:type"
                  element={
                    <CocktailCategory
                      favorites={favorites}
                      onToggle={toggleFavorite}
                      searchTerm={searchTerm}
                    />
                  }
                />
                <Route
                  path="/search"
                  element={
                    <CocktailCategory
                      type="all"
                      title="Search Results"
                      searchTerm={searchTerm}
                      favorites={favorites}
                      onToggle={toggleFavorite}
                    />
                  }
                />
                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Login />} />

                <Route
                  path="/two-oz-cocktails"
                  element={
                    <CocktailCategory
                      type="two-oz"
                      title="2oz Cocktails"
                      searchTerm={searchTerm}
                      favorites={favorites}
                      onToggle={toggleFavorite}
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
                      favorites={favorites}
                      onToggle={toggleFavorite}
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
                      favorites={favorites}
                      onToggle={toggleFavorite}
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
                      favorites={favorites}
                      onToggle={toggleFavorite}
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
                      favorites={favorites}
                      onToggle={toggleFavorite}
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
                      favorites={favorites}
                      onToggle={toggleFavorite}
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
                      favorites={favorites}
                      onToggle={toggleFavorite}
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
                      favorites={favorites}
                      onToggle={toggleFavorite}
                    />
                  }
                />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
        <BottomBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </AuthProvider>
    </div>
  );
}

export default App;
