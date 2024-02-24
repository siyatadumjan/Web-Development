import React, { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaSearch,
  FaShoppingBag,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link as NavLink } from "react-router-dom";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import logo from "../assets/logo.png";
import { useAuthContext } from "../context/useAuthContext";
import { useLogout } from "../context/useLogout";
import { IoBagHandleSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import Cart from "./Cart";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const role = user ? user?.roles : null;
  const accesstoken = user ? user.token : null;
  const id = user?.user?.id;

  const { logout } = useLogout();
  const [slide, setSlide] = useState(false);

  const slideCart = () => {
    setSlide(!slide);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Dispatch the "LOGOUT" action to update the user state
    logout();
  };

  const navItems = [
    {
      title: "Clothings",
      path: "shop",
    },
    {
      title: "Men",
      path: "shop",
    },
    {
      title: "Women",
      path: "shop",
    },
    {
      title: "Bestselling",
      path: "bestselling",
    },
  ];

  return (
    <header className="max-w-screen-2xl xl:px-28 px-4 absolute top-0 right-0 left-0 z-50 bg-whitesmoke">
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        <div className="text-lg text-Black sm:flex items-center gap-4">
          <div className="inline-flex items-center justify-between sm:gap-2 gap-4 text-sm font-bold bg-whitesmoke">
            {user ? (
              <>
                <div className={`custom-dropdown ${isOpen ? "open" : ""}`}>
                  <div className="dropdown-toggle" onClick={toggleDropdown}>
                    <span>
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        alt=""
                        height={"25px"}
                        width={"25px"}
                        className="border border-white rounded-full"
                      />
                    </span>
                    <span className="flex items-center justify-center w-full gap-2">
                      {user?.user?.username}
                      <IoMdArrowDropdown />
                    </span>
                  </div>
                  {isOpen && (
                    <div className="dropdown-menu">
                      <div className="dropdown-option">
                        {" "}
                        <button
                          className="cart-btn flex items-center justify-center w-full p-1 gap-1"
                          onClick={slideCart}
                        >
                          <FaShoppingBag /> Cart
                        </button>{" "}
                      </div>
                      <div className="dropdown-option">
                        <button
                          onClick={handleLogout}
                          className="cart-btn flex items-center justify-center w-full p-1 gap-1"
                        >
                          Logout <MdLogout />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="login-btn">sign in</button>
                </NavLink>
                <NavLink to="/register">
                  <button className="register-btn">sign up</button>
                </NavLink>
              </>
            )}

            <div>
              <button
                onClick={toggleMenu}
                className="lg:hidden md:block sm:block flex"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-5 h-5 text-Black" />
                ) : (
                  <FaBars className="w-5 h-5 text-Black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* nav bar for small devices */}
      </nav>
      <hr />
      <div className="pt-4">
        <ul className="md:flex items-center justify-between text-Black hidden">
          <li>
            <NavLink
              to={role == "admin" ? "/dashboard" : "/"}
              className="text-sm font-bold"
            >
              {role === "admin" ? "Dashboard" : "Home"}
            </NavLink>
          </li>
          {navItems.map(({ title, path, ref }) => (
            <li key={title} className="text-sm font-bold cursor-pointer">
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={50}
                duration={100}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* responsive nav bar */}
      <div
        className={`sm:hidden transition-height ${
          isMenuOpen ? "h-auto max-h-screen" : "h-0 max-h-0"
        }`}
      >
        <ul className="bg-Black text-white px-4 py-2 rounded flex flex-col gap-4">
          <li>
            <NavLink
              to={role == "admin" ? "/dashboard" : "/"}
              className="text-sm font-bold"
            >
              {role === "admin" ? "Dashboard" : "Home"}
            </NavLink>
          </li>
          {navItems.map(({ title, path }) => (
            <li key={title} className="cursor-pointer text-sm font-bold">
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={50}
                duration={100}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Cart slide={slide} slideCart={slideCart} />
    </header>
  );
};

export default Navbar;
