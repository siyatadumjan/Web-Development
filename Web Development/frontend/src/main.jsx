import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Modal from "react-modal";
import { ClothesProvider } from "./context/ClothesContext.jsx";

Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ClothesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ClothesProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
