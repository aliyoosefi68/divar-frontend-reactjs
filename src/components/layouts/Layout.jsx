import React from "react";
import Header from "./Header";
import Footer from "./Footer";

//style
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.main}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
