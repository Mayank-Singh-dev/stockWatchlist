import React from "react";
import "./Header.css";
import {AiOutlineMenu} from 'react-icons/ai'
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [active, setActive]=useState("nav-menu")
  const navToogle=()=>{
    active === "nav-menu" ? setActive("nav-menu nav_active") : setActive("nav-menu")
  }
  return (
    <nav className="navbar">
      <Link to='/' className="NavbarHeader">Stock</Link>
      <ul className={active}>
      <Link to="/"  className="navmenu">Home</Link>
      <Link to="/watchlist"  className="navmenu">Watchlist</Link>
      </ul>
      <AiOutlineMenu className="navicon" onClick={navToogle}/>
    </nav>
  );
};

export default Header;

