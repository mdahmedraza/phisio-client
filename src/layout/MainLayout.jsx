import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.main_layout_container}>
      <Navbar />

      <main className={styles.main_content}>{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
