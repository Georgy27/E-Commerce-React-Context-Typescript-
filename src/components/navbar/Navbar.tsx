import React from "react";
import logo from "../../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../../utils/constants";
import CartButtons from "../cartButtons/CartButtons";
import { useProductsContext } from "../../context/products_context";
import { useUserContext } from "../../context/user_context";
import NavContainer from "./Navbar.styles";

const Nav = () => {
  const { openSidebar } = useProductsContext();
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="comfy sloth" />
          </Link>
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}> {text} </Link>
              </li>
            );
          })}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

export default Nav;
