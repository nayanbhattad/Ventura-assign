import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./config/Routes";
import { Provider } from "react-redux";
import { store } from "./config/store";
import { theme } from "./config/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BiSolidError } from "react-icons/bi";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  function fallbackRender({ error, resetErrorBoundary }) {
    return (
      <div
        className="flex flex-col gap-3 justify-center items-center h-[100vh]"
        role="alert"
      >
        <BiSolidError fontSize={"150px"} color="red" />
        <p className="text-xl md:text-3xl font-bold">
          Oops, Something went wrong
        </p>
        <div className="text-center">
          <p>There was problem connecting to app</p>
          <p>
            Please{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => resetErrorBoundary()}
            >
              refresh
            </span>{" "}
            or check your connection
          </p>
        </div>
        <p className="text-md">Error : {error.message}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
