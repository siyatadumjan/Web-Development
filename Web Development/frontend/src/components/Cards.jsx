import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "./AddToCart";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/useAuthContext";

const Cards = ({ clothes }) => {
  const { fetchCartData } = useCartContext();
  const { user } = useAuthContext()
  const userId = user ? user.user.id : null
  const accesstoken =user ?user.token: null
  const handleQuickAdd = (clothes) => {
    if (clothes.size.length === 1) {
      // Add the logic to handle the case when there's only one size
      addToCart(
        clothes.id,
        userId,
        clothes.color[0],
        clothes.size[0],
        accesstoken
      );
      fetchCartData();
    } else {
      console.log(`Adding size: ${clothes.size[1]}`);
      addToCart(
        clothes.id,
        userId,
        clothes.color[0],
        clothes.size[1],
        accesstoken
      );
      fetchCartData();
      // Add the logic to handle the case when there are multiple sizes
    }
    fetchCartData();
    // Add the rest of your logic for handling the quick add
    // ...
  };
  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 align-items-center justify-items-center gap-12 mx-auto">
      {clothes.slice(0, 12).map((items) => {
        return (
          <div
            key={items.id}
            className="shadow-md p-2"
            style={{ maxHeight: "420px", width: "300px" }}
          >
            <Link to={`/clothes/${items.id}`}>
              <div className="image-container overflow-hidden flex items-center justify-center max-w-[350px]">
                <img
                  src={items.imagePath}
                  alt={items.name}
                  className="object-cover transform transition-transform duration-300 hover:scale-105 h-[285px] w-[200px]"
                />
              </div>
            </Link>
            <div className="mt-4 px-4 flex flex-col justify-center items-center gap-2">
              <h4
                className="text-center font-bold mb-2 w-full text-xs "
                style={{ whiteSpace: "nowrap" }}
              >
                {items.name}
              </h4>
              <div className="flex justify-between w-full">
                <p
                  className="text-black/50 text-xs font-bold"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {items.type}
                </p>
                <p
                  className="text-xs font-bold"
                  style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
                >
                  $ {items.price}
                </p>
              </div>
              <button
                onClick={() => {
                  handleQuickAdd(items);
                }}
                className="w-full bg-black text-white px-3 py-1 text-sm font-bold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
