import { Toaster } from "react-hot-toast";
import useRouteElement from "./routes/useRouteElement";
import ThemeContext from "./context/ThemeContext";
import { useState } from "react";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  const routeElements = useRouteElement();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const themeMode = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={themeMode}>
      <ThemeContext.Provider value={[theme, setTheme]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {routeElements}
        </LocalizationProvider>
        <Toaster />
        <CssBaseline />
        {/* có thằng CssBaseLine để đồng bộ css */}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
