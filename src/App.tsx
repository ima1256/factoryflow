import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
// import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

import Logo from "./components/Logo";

// dotenv.config()

export default function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* <Navbar /> */}
        <Logo />

        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<Machines />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
