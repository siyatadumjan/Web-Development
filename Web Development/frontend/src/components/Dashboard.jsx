import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { CgAddR } from "react-icons/cg";
import "../css/Dashboard.scss";

import { AiOutlineMenu } from "react-icons/ai";
import { Outlet } from "react-router-dom";
import AddClothes from "./AddClothes";

const Dashboard = () => {
  const [slide, setSlide] = useState(false);
  const [isCreateClothesModalOpen, setCreateClothesModalOpen] = useState(false);
  const openCreateClothesModal = () => {
    setCreateClothesModalOpen(!isCreateClothesModalOpen);
  };

  const handleSlide = () => {
    setSlide(!slide);
  };
  return (
    <div className="dashboard-container">
      <div className={slide ? "sidebar slide" : "sidebar"}>
        <Sidebar slide={handleSlide} />
      </div>
      <main className="dashboard-items-container pr-5">
        <div className="mb-5 py-2 pr-2 topbar flex items-center justify-between">
          <div className="flex gap-3">
            <button onClick={handleSlide} className="hamburger-btn">
              <AiOutlineMenu />
            </button>
            <h2>Welcome to Dashboard!</h2>
          </div>
          <div>
            <button
              onClick={openCreateClothesModal}
              className="flex items-center justify-center gap-2 bg-black text-white px-2 rounded-sm py-1 text-xs font-bold"
            >
              <CgAddR />
              Add Clothes
            </button>
          </div>
        </div>
        <Outlet />
      </main>
      <AddClothes
        isOpen={isCreateClothesModalOpen}
        onRequestClose={openCreateClothesModal}
      />
    </div>
  );
};

export default Dashboard;
