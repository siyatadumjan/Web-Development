import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useAuthContext } from "../context/useAuthContext";
import { addToCart } from "./AddToCart";
import { useCartContext } from "../context/CartContext";

const Singleproduct = () => {
  const { user } = useAuthContext();
  const userId = user ? user.user?.id : null;
  const accesstoken = user ? user.token : null;
  const { id } = useParams();
  const [clothes, setClothes] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { fetchCartData } = useCartContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/clothing/get-by-id/${id}`
        );
        setClothes(res?.data?.clothing);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    // Set the default selected color and size to the first ones
    if (
      clothes &&
      clothes.color &&
      clothes.color.length > 0 &&
      clothes.size &&
      clothes.size.length > 0
    ) {
      setSelectedColor(clothes.color[0]);
      setSelectedSize(clothes.size[0]);
    }
  }, [clothes]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const AddtoCart = (id) => {
    addToCart(id, userId, selectedColor, selectedSize, accesstoken);
    fetchCartData();

  };
  return (
    <div className="mt-28 max-w-screen-2xl container mx-auto xl:px-28 px-4">
      <div className="p-3 max-w-7xl m-auto">
        <div className="mt-6 sm:mt-10">
          <div className="flex flex-col gap-5 items-center justify-evenly h-max md:flex-row sm:flex-row">
            <div>
              <img
                src={clothes?.imagePath}
                alt=""
                className="max-w-[400px] max-h-[500px]"
              />
            </div>
            <div className="flex flex-col  items-start justify-center gap-3 lg:w-[50%]">
              <h2 className="text-lg font-bold capitalize">{clothes?.name}</h2>
              <p className="mt-3 text-gray-600 text-sm leading-6 text-justify font-semibold sm:text-left sm:mt-4 place-items-center place-content-center">
                {clothes?.description}
              </p>
              <div className="my-2 text-xl text-yellow-300 flex items-center gap-1 sm:my-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="flex flex-wrap gap-2">
                {clothes && clothes?.color
                  ? clothes.color.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => handleColorClick(color)}
                        className={`px-3 py-1 rounded focus:outline-none font-sans text-xs font-semibold ${
                          selectedColor === color
                            ? "bg-black text-white"
                            : "border border-black bg-white text-black"
                        }`}
                      >
                        {color}
                      </button>
                    ))
                  : null}
              </div>
              <div className="flex flex-wrap gap-5 justify-center items-center">
                SIZE:
                {clothes && clothes?.size
                  ? clothes.size.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeClick(size)}
                        className={`w-[35px] h-[35px] rounded focus:outline-none font-sans text-xs font-semibold ${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "border border-black bg-white text-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))
                  : null}
              </div>
              <div className="text-lg text-red-500 font-bold sm:text-xl">
                <span className="text-black">Price:</span> $ {clothes?.price}
              </div>
              <button
                onClick={() => AddtoCart(id)}
                className="bg-black text-white h-7 w-[200px] px-2 rounded-sm border border-black font-bold text-xs"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singleproduct;
