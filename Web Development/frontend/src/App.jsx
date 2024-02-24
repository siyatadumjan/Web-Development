import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Singleproduct from "./components/Singleproduct";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Content from "./components/Content";
import DashboardClothes from "./components/DashboardClothes";

function App() {
  const location = useLocation();
  const showNavigation = !location.pathname.startsWith("/dashboard");
  return (
    <>
      {showNavigation && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clothes/:id" element={<Singleproduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<Content />} />
          <Route path="clothing" element={<DashboardClothes />} />

        </Route>
      </Routes>

      {showNavigation && <Footer />}
    </>
  );
}

export default App;
