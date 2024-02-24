import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const addToCart = async (
  clothingId,
  userID,
  color,
  size,
  accesstoken
) => {
  const cartData = {
    userId: parseInt(userID),
    clothingId: parseInt(clothingId),
    quantity: 1,
    color: color,
    size: size,
  };

  try {
    await axios.post(
      "http://localhost:8080/api/v1/carts/add-to-cart",
      cartData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );
    console.log("Cart data added:", cartData);
    // Handle successful response as needed

    toast.success("clothing has been added to the Cart", {
      position: "top-right",
      style: {
        height: "25px", // Adjust this value to your desired height
        fontSize: "13px",
        margin: 0,
      },
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    localStorage.removeItem("user");
    window.location = "/sign-in";
    // Handle errors
  }
};
