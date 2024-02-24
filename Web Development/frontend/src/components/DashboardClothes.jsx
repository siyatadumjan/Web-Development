import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { useClothesContext } from "../context/ClothesContext";
import { Link } from "react-router-dom";
import EditClothes from "./EditClothes";

const DashboardClothes = () => {
  const {
    clothesData,
    loading,
    getSingleClothes,
    getClothes,
    deleteClothes,
    singleClothes,
    updateClothes,
  } = useClothesContext();
  const { user } = useAuthContext();
  const accesstoken = user ? user.token : null;

  const [isCreateClothesModalOpen, setCreateClothesModalOpen] = useState(false);
  const openCreateClothesModal = () => {
    setCreateClothesModalOpen(!isCreateClothesModalOpen);
  };

  const fetchSingleClothes = (id) => {
    getSingleClothes(id);
    openCreateClothesModal();
  };

  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 align-items-center justify-items-center gap-12 mx-auto">
      {!loading &&
        clothesData.slice(0, 12).map((items) => {
          return (
            <div
              key={items.id}
              className="shadow-md p-2"
              style={{ maxHeight: "500px", width: "300px" }}
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
                    fetchSingleClothes(items.id);
                  }}
                  className="w-full bg-black text-white px-3 py-1 text-sm font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteClothes(items.id);
                  }}
                  className="w-full bg-black text-white px-3 py-1 text-sm font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

      <EditClothes
        isOpen={isCreateClothesModalOpen}
        onRequestClose={openCreateClothesModal}
        singleClothes={singleClothes}
        loading={loading}
        updateClothes={updateClothes}
      />
    </div>
  );
};

export default DashboardClothes;
