import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "./useLogout";
import { useAuthContext } from "./useAuthContext";

const ClothesContext = createContext();

export const ClothesProvider = ({ children }) => {
  const [singleClothes, setSingleClothes] = useState(null);
  const [clothesData, setClothesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const accesstoken = user ? user.token : null;

  const navigate = useNavigate();
  const { logout } = useLogout();

  const create = async (data) => {
    try {
      await axios.post("http://localhost:8080/api/v1/clothing/create", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      getClothes();
    } catch (err) {
      console.log(err);
      logout();
    }
  };

  const getClothes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/clothing/get-all"
      );
      const newClothes = res.data.clothing;
      setClothesData(newClothes);
      setLoading(false); // Set loading to false when data is fetched
    } catch (err) {
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const getSingleClothes = async (clothesId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/clothing/get-by-id/${clothesId}`
      );

      setSingleClothes(res.data.clothing);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const updateClothes = async (clothesId, clothesData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/clothing/update/${clothesId}`,
        clothesData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );
      const updatedClothes = response.data;
      console.log(updatedClothes);

      getClothes();
    } catch (error) {
      console.error("Error updating clothes:", error);
    }
  };

  const deleteClothes = async (clothesId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/clothing/${clothesId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      getClothes()
    } catch (error) {
      console.error("Error deleting clothes:", error);
    }
  };

  useEffect(() => {
    getClothes();
  }, []);

  return (
    <ClothesContext.Provider
      value={{
        create,
        clothesData,
        loading,
        getClothes,
        singleClothes,
        getSingleClothes,
        updateClothes,
        deleteClothes,
      }}
    >
      {children}
    </ClothesContext.Provider>
  );
};

export const useClothesContext = () => {
  return useContext(ClothesContext);
};
