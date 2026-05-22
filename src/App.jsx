import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Test from "./pages/test";

const App = () => {
  return (
    <Routes>
      <Route index element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default App;
