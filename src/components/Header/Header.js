import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="text">
        vAiL mTb
      </Link>
    </header>
  );
};

export default Header;
