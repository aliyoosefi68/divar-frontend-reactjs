import React from "react";

//style
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
}

export default Loader;
