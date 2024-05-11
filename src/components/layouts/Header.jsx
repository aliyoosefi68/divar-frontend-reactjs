import React, { useContext } from "react";

import { Link } from "react-router-dom";

//icons
import { IoIosSearch } from "react-icons/io";
import { RiUserLine } from "react-icons/ri";

//style
import styles from "./Header.module.css";
import { PostContext } from "src/context/PostContext";

function Header() {
  const { cities, city, setCity } = useContext(PostContext);
  console.log(city);
  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span className={styles.location}>
          <img src="location.svg" />
          <select
            name="cityselect"
            id="cityselect"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </span>
        <div className={styles.serchfild}>
          <input type="text" placeholder="جستوجو در همه آگهی ها" />
          <IoIosSearch />
        </div>
      </div>
      <div>
        <Link to="/auth">
          <span>
            <RiUserLine />
            <p>دیوار من</p>
          </span>
        </Link>
        <Link to="/new" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
