import { useContext } from "react";
import AuthContext from "./AuthContext"; // Correct casing for import

export const useAuthContext = () => {
  const context = useContext(AuthContext); // Correct casing for useContext

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside an AuthContextProvider"
    );
  }

  return context; // Make sure to return the context
};
