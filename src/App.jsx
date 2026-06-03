import { Route, Routes } from "react-router-dom";
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

const App = () => {
  const appData = useAppData();

  return (
    <>
      <AppContext.Provider value={appData}>
        <div className="bg-bg min-h-screen p-5 sm:px-10 sm:pt-10 sm:pb-5 pt-8 transition-all">
          <Routes>
            <Route
              index
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
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
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </AppContext.Provider>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default App;
