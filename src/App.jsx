import { Toaster } from "react-hot-toast";
import useRouteElement from "./routes/useRouteElement";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routeElements = useRouteElement();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {routeElements}
      </LocalizationProvider>
      <Toaster />
      <ToastContainer />
      <CssBaseline />
    </>
  );
}

export default App;
