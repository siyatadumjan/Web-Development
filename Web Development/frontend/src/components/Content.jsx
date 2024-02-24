import React from "react";
import "../css/content.scss";
import img1 from "../assets/dashboard1.png";
import img2 from "../assets/dashboard2.png";
import img3 from "../assets/dashboard3.png";
import img4 from "../assets/dashboard4.png";
import img5 from "../assets/dashboard5.png";


const Content = () => {
 

  return (
    <div>
      <div className="dashboard-card">
        <div className="card ">
          <img
            src={img1}
            alt=""
            className="shadow-lg w-[250px] h-[150px] aspect-auto rounded-md"
          />
        </div>
        <div className="card ">
          <img
            src={img2}
            alt=""
            className="shadow-lg w-[250px] h-[150px] aspect-auto rounded-md"
          />
        </div>
        <div className="card ">
          <img
            src={img3}
            alt=""
            className="shadow-lg w-[250px] h-[150px] aspect-auto rounded-md"
          />
        </div>
        <div className="card ">
          <img
            src={img4}
            alt=""
            className="shadow-lg w-[250px] h-[150px] aspect-auto rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-wrap py-5 gap-5">
        <div className="flex flex-col gap-5 w-full">
          <div className="px-3">
            <img
              src={img5}
              alt=""
              className="shadow-xl rounded-md w-full aspect-auto min-w-[300px] min-h-[200px]"
            />
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Content;
