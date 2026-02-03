import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>PureMotion Physio</h2>
        </div>

        {/* Desktop navigation */}
        <nav className={styles.desktopNav}>
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a className={styles.bookBtn} href="/appointment">Book Now</a>
        </nav>

        {/* Mobile Hamburger */}
        <div className={styles.hamburger} onClick={() => setOpen(!open)}>
          <span className={`${styles.line} ${open ? styles.line1 : ""}`}></span>
          <span className={`${styles.line} ${open ? styles.line2 : ""}`}></span>
          <span className={`${styles.line} ${open ? styles.line3 : ""}`}></span>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div className={`${styles.sideMenu} ${open ? styles.openMenu : ""}`}>
        <a href="/" onClick={() => setOpen(false)}>Home</a>
        <a href="/services" onClick={() => setOpen(false)}>Services</a>
        <a href="/about" onClick={() => setOpen(false)}>About</a>
        <a href="/contact" onClick={() => setOpen(false)}>Contact</a>
        <a className={styles.bookBtnMobile} href="/appointment" onClick={() => setOpen(false)}>Book Appointment</a>
      </div>

      {/* Overlay */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </header>
  );
};

export default Navbar;
