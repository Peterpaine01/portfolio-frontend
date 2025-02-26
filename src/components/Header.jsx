import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Images

// PDF
import CV from "../assets/Fanny-Carlier_CV-AOUT2024-Alternance.pdf";

// Je récupère les props
const Header = ({ user }) => {
  return (
    <>
      <header>
        <div className="top-menu">
          <div className="container-full flex-parent">
            <Link className="logo" to="/">
              <p>
                <strong>{user.title}</strong>
                {user.subtitle && ` - ${user.subtitle}`}
              </p>
            </Link>

            <nav className="flex-parent">
              <Link
                className="btn-light"
                onClick={() => (window.location = `mailto:${user.email}`)}
              >
                Contact
              </Link>
              <a className="btn-outlined" href={user.cv} target="_blank">
                <i className="fa-solid fa-download fa-bounce big-icon"></i>{" "}
                Télécharger le cv
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* burger menu */}
      <div className="burger-menu">
        <input
          className="hamburger"
          type="checkbox"
          id="icon-menu-burger"
          tabIndex="0"
        />
        <label aria-label="Ouvrir menu" htmlFor="icon-menu-burger">
          <span></span>
        </label>
        <nav className="flex-parent menu-mobile">
          <Link
            className="btn-light"
            onClick={() => (window.location = "mailto:facarlier@gmail.com")}
          >
            Contact
          </Link>
          <a className="btn-outlined" href={CV} target="_blank">
            <i className="fa-solid fa-download fa-bounce big-icon"></i>{" "}
            Télécharger le cv
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;
