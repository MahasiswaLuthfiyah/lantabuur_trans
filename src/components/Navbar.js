import React, { useState } from "react";
import { Link } from "gatsby";
import whatsapp from "../img/whatsapp.png";
import logo from "../img/logo.png";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Lantabuur Trans" style={{ width: "88px" }} />
          </Link>

          <button
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isActive}
            onClick={() => setIsActive(!isActive)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div
          id="navMenu"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              Tentang Kami
            </Link>
            <Link className="navbar-item" to="/armada">
              Armada
            </Link>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
            <Link className="navbar-item" to="/contact">
              Kontak
            </Link>
          </div>

          <div className="navbar-end has-text-centered">
            <a
              className="navbar-item"
              href="https://wa.me/6285859896545?text=Halo, Admin Lantabuur Trans! Saya mau tanya soal sewa kendaraan. Bisa dibantu?"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <img src={whatsapp} alt="WhatsApp" style={{ width: "28px" }} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
