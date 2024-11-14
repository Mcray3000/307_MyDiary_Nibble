// src/HamburgerMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import menu from "./assets/Menu.svg";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {}, 10);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
      <button
        className="hamburger-button"
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <img
          src={menu}
          alt="Menu"
          style={{ border: "none", outline: "none" }}
        />
      </button>
      {isOpen && (
        <nav className="hamburger-nav">
          <ul>
            <li>
              <Link to="/main" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/discover" onClick={toggleMenu}>
                Public Scribbles
              </Link>
            </li>
            <li>
              <Link to="/calendar" onClick={toggleMenu}>
                Calendar
              </Link>
            </li>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;
