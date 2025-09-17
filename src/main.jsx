import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// MUI imports
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Font imports
import "@fontsource/montserrat"; // default weight 400
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

const theme = createTheme({
  palette: {
    mode: "dark", // 🌙 enables dark mode
    background: {
      default: "#101725", // global bg color
      paper: "rgba(28,34,49,0.97)", // card bg (same as your pages)
    },
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#00c853",
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* applies dark background + text color */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
