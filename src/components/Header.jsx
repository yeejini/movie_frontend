import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/movieList">시네마</Link>
      </div>
      <div className="navbar-center">
        <Link to="/community">커뮤니티</Link>
      </div>
      <div className="navbar-right">
        <Link to="/mypage">내 정보</Link>
      </div>
    </nav>
  );
};

export default Header;
