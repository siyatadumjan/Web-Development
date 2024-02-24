import React, { useEffect } from "react";
import "../css/App.scss";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { useLogout } from "../context/useLogout";
import axios from "axios";
import { AiOutlineClose,  } from "react-icons/ai";

const Cart = ({ slide, slideCart }) => {
  const { user } = useAuthContext();
  const { cartItems, fetchCartData } = useCartContext();
  const accesstoken = user ? user.token : null;
  const userId = user ? user?.user?.id : null;
  const navigate = useNavigate();
  const { logout } = useLogout();
  useEffect(() => {
    fetchCartData();
  }, [cartItems]);
  const handleIncreaseQuantity = async (cartId, quantity) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/carts/update/${cartId}`,
        { newQuantity: quantity + 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      fetchCartData();
    } catch (error) {
      console.error("Error updating cart:", error);
      logout();
    }
  };

  const handleDecreaseQuantity = async (cartId, quantity) => {
    if (quantity > 1) {
      try {
        await axios.patch(
          `http://localhost:8080/api/v1/carts/update/${cartId}`,
          { newQuantity: quantity - 1 },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );
        fetchCartData();
      } catch (error) {
        console.error("Error updating cart:", error);
        logout();
      }
    }
    if (quantity <= 1) {
      handleRemoveCartItem(cartId);
    }
  };

  const handleRemoveCartItem = async (cartId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/carts/delete/${cartId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      fetchCartData();
    } catch (error) {
      console.error("Error deleting cart:", error);
      logout();
    }
  };
  return (
    <div className={slide ? `cart-wrapper py-5 px-3` : `slide`}>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">CHECKOUT</h2>
        <button onClick={() => slideCart()}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="max-h-[100%] py-3 overflow-y-auto">
        {cartItems.length != 0 ? (
          cartItems.map((items) => {
            return (
              <div className="cart" key={items.cartId}>
                <div className="py-2 flex">
                  <img src={items.imagePath} alt="" className="max-h-[130px]" />
                  <div className="cart-details py-2 w-full flex flex-col gap-3 items-start justify-center">
                    <div className="flex gap-2 justify-between w-full">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-sans text-sm font-bold capitalize">
                          {items.name}
                        </h3>
                        <div className="flex gap-2 cart-description">
                          <p className="font-bold font-sans text-xs text-slate-500">
                            Color: {items.color},
                          </p>
                          <p className="font-bold font-sans text-xs text-slate-500">
                            SIZE: {items.size}
                          </p>
                        </div>
                      </div>
                      <div className="font-sans price-wrapper">
                        ${items.price}
                      </div>
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(items.cartId, items.quantity)
                          }
                        >
                          &#8722;
                        </button>
                        <p>{items.quantity}</p>
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(items.cartId, items.quantity)
                          }
                        >
                          &#43;
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => handleRemoveCartItem(items.cartId)}
                          className="text-md hover:text-gray-600 transition ease-linear font-bold text-xs"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="">
            <div className="wrapper flex flex-row font-bold gap-3 py-1 px-2 border-b border-slate-200">
              <p>No items in bag</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
