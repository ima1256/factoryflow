import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
// import Navbar from "./components/Navbar";
import dotenv from "dotenv";
import Logo from "./components/Logo";

// dotenv.config()

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Logo />
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<Machines />} />
      </Routes>
    </BrowserRouter>
  );
}
