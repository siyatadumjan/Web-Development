import React from "react";
import banner from "../assets/image-product.png";
import { FaShoppingBag } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-primarybg py-12 xl:px-28 px-4">
      <div>
        <div className="py-28 flex flex-col md:flex-row-reverse justify-between items-center gap-14">
          <div className="md:w-1/2">
            <img src={banner} alt="" />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold mb-5 first-line:">Collections</h1>
            <p className="text-xl mb-7 font-semibold">
              you can explore ans shop many different collection from various
              brands here.
            </p>
            <button className="bg-Black hover:bg-orange-500 px-6 py-2 text-white font-bold rounded-sm transition-all ease-linear flex items-center gap-2">
              <FaShoppingBag className="inline-flex" /> Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
