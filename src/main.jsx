import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={`dev-fwind43gm0ke6umv.eu.auth0.com`}
      clientId={`fXkXyqCPjXYqQPHTggyENRfrRXO5VUJj`}
      redirectUri={window.location.origin}
    >
      
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
