import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const shouldShowHeader = !["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Add a slight delay to show loading spinner

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {shouldShowHeader && <Header />}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-wrapper"
          >
            <div className="loading-spinner"></div>
          </motion.div>
        ) : (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default MainLayout;
