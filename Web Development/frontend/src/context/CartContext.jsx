import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "./useLogout";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const id = user?.user?.id;
  const accesstoken = user ? user.token : null;

  const navigate = useNavigate();
  const { logout } = useLogout();

  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/carts/get-by-user/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      if (id && accesstoken) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch cart data from the server
    fetchCartData();
  }, []);

  return (
    !loading && (
      <CartContext.Provider value={{ cartItems, fetchCartData }}>
        {children}
      </CartContext.Provider>
    )
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
