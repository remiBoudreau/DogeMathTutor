// React
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Material UI
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
// Toasts
import { ToastProvider } from "react-toast-notifications";
// Global Styles
import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fa991c",
    },
    secondary: {
      main: "#1c768f",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider placement="top-left">
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </ToastProvider>
  </Provider>,
  document.getElementById("root")
);
