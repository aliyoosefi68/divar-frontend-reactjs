import React from "react";
import { Link } from "react-router-dom";

//icons
import { FaRegCircleUser } from "react-icons/fa6";
import { RiSignpostLine } from "react-icons/ri";
import { TbCategory2 } from "react-icons/tb";
import { IoOptions } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";

//styles
import styles from "./AdminSidebar.module.css";
import { e2p } from "src/utils/numbers";

function AdminSidebar({ data }) {
  const logoutHandler = async () => {
    const res = await fetch("http://localhost:3000/auth/logout");
    const data = await res.json();
  };
  return (
    <div className={styles.container}>
      <div className={styles.profileIcon}>
        <FaRegCircleUser />
        <h4>{data.role === "ADMIN" ? "ادمین" : "کاربر "}</h4>
        <span>{e2p(data.mobile)}</span>
      </div>
      <div className={styles.links}>
        <Link to="/admin" className={styles.linkItem}>
          <IoHomeOutline />
          داشبورد
        </Link>
        <Link to="/" className={styles.linkItem}>
          <RiSignpostLine />
          آگهی ها
        </Link>
        <Link to="/admin/categories-list" className={styles.linkItem}>
          <TbCategory2 />
          دسته بندی ها
        </Link>
        <Link to="/admin/add-category" className={styles.linkItem}>
          <TbCategoryPlus />
          افوزدن دسته بندی
        </Link>
        <Link to="/admin/add-option" className={styles.linkItem}>
          <IoOptions />
          ویژگی ها
        </Link>
      </div>
      <button className={styles.logout} onClick={logoutHandler}>
        خروج
      </button>
    </div>
  );
}

export default AdminSidebar;
