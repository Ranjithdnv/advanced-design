import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SnackbarProvider } from "notistack";
import App from "./App.jsx";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={4000}
      TransitionComponent={Fade}
      TransitionProps={{
        timeout: {
          enter: 1000, // Time in ms for the transition to complete (enter)
          exit: 1000, // Time in ms for the transition to exit
        },
      }}
    >
      <App />
    </SnackbarProvider>
  </StrictMode>
);
