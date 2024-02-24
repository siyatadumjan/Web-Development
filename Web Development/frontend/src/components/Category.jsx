import React from "react";
import img1 from "../assets/brand1.png";
import img2 from "../assets/brand2.png";
import img4 from "../assets/brand4.png";
import img5 from "../assets/brand5.png";
import img11 from "../assets/image1.png";
import img12 from "../assets/image2.png";
import img13 from "../assets/image3.png";
import img14 from "../assets/image4.png";
import img15 from "../assets/image5.png";
import { Link } from "react-router-dom";

const logos = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
];

const Category = () => {
  return (
    <div className="max-w-screen-2xl mx-auto container xl:px-28 px-4 py-28">
      {/* brand logo */}
      <div className="flex items-center justify-around flex-wrap gap-4 py-5">
        {logos.map(({ id, img }) => (
          <div key={id}>
            <img
              src={img}
              alt=""
              className="w-full overflow-y-hidden overflow-x-hidden transform hover:scale-105 transition-transform duration-200"
            />
          </div>
        ))}
      </div>
      {/* Category grid */}
      <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
        <div>
          <Link to="/">
            <img
              src={img11}
              alt=""
              className="w-full overflow-hidden transform hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-2">
            <Link to={"/"}>
              <img
                src={img12}
                alt=""
                className="w-full overflow-hidden transform hover:scale-105 transition-transform duration-200"
              />
            </Link>
            <Link to={"/"}>
              <img
                src={img13}
                alt=""
                className="w-full overflow-hidden transform hover:scale-105 transition-transform duration-200"
              />
            </Link>
            <Link to={"/"}>
              <img
                src={img14}
                alt=""
                className="w-full overflow-hidden transform hover:scale-105 transition-transform duration-200"
              />
            </Link>
            <Link to={"/"}>
              <img
                src={img15}
                alt=""
                className="w-full overflow-hidden transform hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
