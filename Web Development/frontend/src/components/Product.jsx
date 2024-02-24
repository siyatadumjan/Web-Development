import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Cards from "./Cards";

const Product = () => {
  const [clothes, setClothes] = useState([]);
  const [filter, setFilterItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/clothing/get-all"
        );

        setClothes(res.data.clothing);
        setFilterItems(res.data.clothing);
      } catch (e) {
        console.log(e);
      }
    };
    fetchClothes();
  }, []);

  const filterItems = (category) => {
    const items =
      category === "all"
        ? clothes
        : clothes.filter((items) => items.category === category);
    setFilterItems(items);
    selectedCategory(category);
  };

  const showAll = () => {
    setFilterItems(clothes);
    setSelectedCategory("all");
  };

  const handleSortChange = (option) => {
    setSort(option);

    let sortedItems = [...filter];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default case (do nothing for 'default' option)
        break;
    }

    setFilterItems(sortedItems);
  };

  return (
    <div className="max-s-2xl container mx-auto xl:px-28 px-4 mb-12 h-auto services" id="shop">
      <h2 className="text-2xl font-bold capitalize text-center my-8">
        Shop
      </h2>

      <div>
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className="font-bold text-sm hover:border-b border-b-black transition-all ease-linear"
            >
              All Clothes
            </button>
            <button
              onClick={() => {
                filterItems("Male");
              }}
              className="font-bold text-sm hover:border-b border-b-black transition-all ease-linear"
            >
              Men
            </button>
            <button
              onClick={() => {
                filterItems("Female");
              }}
              className="font-bold text-sm hover:border-b border-b-black transition-all ease-linear"
            >
              Women
            </button>
          </div>

          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              name=""
              id=""
              className="bg-black text-white px-2 py-1 rounded-sm text-xs font-bold"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sort}
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        <Cards clothes={filter} />
      </div>
    </div>
  );
};

export default Product;
