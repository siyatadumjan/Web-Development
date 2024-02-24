import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { useCartContext } from "../context/CartContext";
import { addToCart } from "./AddToCart";

const BestSeller = () => {
  const [clothes, setClothes] = useState([]);
  const { user } = useAuthContext();
  const { fetchCartData } = useCartContext();
  const userId = user ? user.user.id : null;
  const accesstoken = user ? user.token : null;

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/clothing/get-all"
        );

        // Filter best sellers
        const bestSellers = res.data.clothing.filter(
          (item) => item.bestseller === true
        );

        setClothes(bestSellers);
      } catch (e) {
        console.log(e);
      }
    };

    fetchClothes();
  }, []);

  const handleQuickAdd = (clothes) => {
    if (clothes.size.length === 1) {
      // Add the logic to handle the case when there's only one size
      addToCart(
        clothes.id,
        userId,
        clothes.color[0],
        clothes.size[0],
        accesstoken
      );
      fetchCartData();
    } else {
      console.log(`Adding size: ${clothes.size[1]}`);
      addToCart(
        clothes.id,
        userId,
        clothes.color[0],
        clothes.size[1],
        accesstoken
      );
      fetchCartData();
      // Add the logic to handle the case when there are multiple sizes
    }
    fetchCartData();
    // Add the rest of your logic for handling the quick add
    // ...
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4" id="bestselling">
      <div className="text-center">
        <h2 className="text-3xl font-bold capitalize text-center my-8">
          BEST SELLERS
        </h2>
        <p className="text-black/75 capitalize md:w-2/3 mx-auto mb-8 font-semibold text-sm">
          Best sellers Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus arcu nunc, fermentum quis sapien in, placerat scelerisque
          risus. Class aptent taciti sociosqu ad litora torquent per
        </p>
      </div>

      <div className="mb-16">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {clothes.map((items) => (
            <SwiperSlide key={items.id}>
              {/* Render your best-selling item here */}
              <div
                key={items.id}
                className="shadow-sm p-2 mx-auto"
                style={{ maxHeight: "420px", maxWidth: "300px" }}
              >
                <Link to={`/clothes/${items.id}`}>
                  <div className="image-container overflow-hidden flex items-center justify-center">
                    <img
                      src={items.imagePath}
                      alt={items.name}
                      className="object-cover transform transition-transform duration-300 hover:scale-105 h-[285px] w-[200px]"
                    />
                  </div>
                </Link>
                <div className="mt-4 px-4 flex flex-col justify-center items-center gap-2">
                  <h4
                    className="text-base font-bold mb-2 w-full font-xs"
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
                      handleQuickAdd(items);
                    }}
                    className="w-full bg-black text-white px-3 py-1 text-sm font-bold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BestSeller;
