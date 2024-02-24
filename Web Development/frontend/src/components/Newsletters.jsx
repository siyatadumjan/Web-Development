import React from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import { Link } from "react-router-dom";

const Newsletters = () => {
  return (
    <div className="bg-[#1e2832] bg-opacity-5 xl:px-28 px-4 py-16">
      <h2 className="text-2xl font-bold capitalize text-center my-8">
        Follow products and discounts on Instagram
      </h2>
      <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
        <Link to="www.instagram.com">
          <img src={img1} alt="" />
        </Link>
        <Link to="www.instagram.com">
          <img src={img2} alt="" />
        </Link>
        <Link to="www.instagram.com">
          <img src={img3} alt="" />
        </Link>
        <Link to="www.instagram.com">
          <img src={img4} alt="" />
        </Link>
        <Link to="www.instagram.com">
          <img src={img5} alt="" />
        </Link>
      </div>
      <div>
        <h2 className="text-2xl font-bold capitalize text-center my-8">
          Or subscribe to the newsletter
        </h2>
        <form className="md:w-1/2 mx-auto text-center">
          <input
            type="email"
            placeholder="email address..."
            className="h-8 bg-transparent outline-none border-b-2 pl-2 border-black md:w-2/3 w-full mb-5 placeholder:text-black/50 mr-4"
          />
          <input type="submit" value={"Submit"} className="bg-black px-6 py-1 rounded-sm text-white font-bold text-md"/>
        </form>
      </div>
    </div>
  );
};

export default Newsletters;
