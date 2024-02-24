import React from "react";
import img1 from "../assets/collection-bg.png";
import img2 from "../assets/zara-logo.png";

const Collection = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${img1})`,
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat xl:px-28 px-4 my-20"
      style={backgroundImageStyle}
    >
      <div className="min-h-[580px] flex justify-between md:flex-row items-center">
        <div className="md:w-1/2"></div>
        <div className="md:w-1/2">
          <img src={img2} alt="" />
          <p className="text-md text-white capitalize my-8 md:2/3 leading-[32px] font-semibold">
            Lustrous yet understated. The new evening wear collection
            exclusively offered at the reopened Giorgio Armani boutique in Los
            Angeles. see collection.
          </p>
          <div className="px-6 py-2 text-black bg-white font-bold rounded-sm ">
            See Collection
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
