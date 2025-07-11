import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
// import Navbar from "./components/Navbar";
import dotenv from "dotenv";

// dotenv.config()

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/machines" element={<Machines />} />
      </Routes>
    </BrowserRouter>
  );
}
