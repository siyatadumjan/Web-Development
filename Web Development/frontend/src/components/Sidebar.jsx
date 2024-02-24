import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import img1 from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { useLogout } from "../context/useLogout";
import { BsGrid1X2, BsArchive, BsPerson } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { BiLogOut, BiHome } from "react-icons/bi";
const Sidebar = ({ slide }) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    // Dispatch the "LOGOUT" action to update the user state
    logout();
  };
  return (
    <div className="sidebar-nav">
      <header>
        <div className="flex gap-3 justify-between items-center">
          <button className="close-btn" onClick={slide}>
            <AiOutlineClose />
          </button>
          <Link>
            <img src={img1} alt="" />
          </Link>
        </div>
      </header>
      <div className="account-container">
        <Link to={"/#"}>
          <span className="img-container">
            <img src="" alt="N" width={"30px"} height={"30px"} />
          </span>
          <span className="username-container">
            {user ? user.user.username : "account"}
          </span>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <BsGrid1X2 />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/">
              <BiHome />
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/clothing">
              <GiClothes /> Clothes
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <BsPerson />
              Users
            </Link>
          </li>
          
        </ul>
      </nav>
      <div className="logout-container">
        <button
          className="flex items-center justify-center gap-1"
          onClick={handleLogout}
        >
          <BiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
