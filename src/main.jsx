import store from "./redux/store.js";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth-context.jsx";
import { ThemeProvider } from "./context/theme-context.jsx";
/* ====================================================== */

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
        <ToastContainer />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
