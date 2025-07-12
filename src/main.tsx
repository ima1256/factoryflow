// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Rubik, sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// import { ThemeProvider } from "@mui/material/styles";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
);
