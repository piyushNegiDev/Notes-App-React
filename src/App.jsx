import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import SingleNote from "./components/SingleNote";
import { AppContext } from "./context/AppContext";
import { useAppData } from "./hooks/useAppData";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./components/ForgotPassword";
import { useIsMobile } from "./hooks/useIsMobile";
import { AnimatePresence, easeOut } from "motion/react";
import { motion } from "motion/react";

const App = () => {
  const appData = useAppData();
  const isMobile = useIsMobile();

  return (
    <>
      <AppContext.Provider value={appData}>
        <div className="bg-bg min-h-screen p-5 sm:px-10 sm:pt-10 sm:pb-5 pt-8 transition-all">
          <AnimatedRoutes />
        </div>
      </AppContext.Provider>

      <ToastContainer
        position={isMobile ? "bottom-center" : "top-center"}
        toastStyle={{
          borderRadius: "16px",
          width: "320px",
          marginBottom: "20px",
          marginTop: "20px",
          overflow: "hidden",
        }}
      />
    </>
  );
};

function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          index
          element={
            <PageTransition>
              <PublicRoute>
                <Signup />
              </PublicRoute>
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </PageTransition>
          }
        />
        <Route
          path="forgot-password"
          element={
            <PageTransition>
              <ForgotPassword />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/note/:id"
          element={
            <PrivateRoute>
              <SingleNote />
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
