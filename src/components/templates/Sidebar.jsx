import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCategory } from "src/services/admin";

//icons
import { BiCategoryAlt } from "react-icons/bi";

//styles
import styles from "./Sidebar.module.css";

function Sidebar({ category, setCategory }) {
  const { data } = useQuery(["get-categories"], getCategory);

  return (
    <div className={styles.sidebar}>
      <ul className={styles.parents}>
        <li onClick={() => setCategory("")} className={styles.parent}>
          <BiCategoryAlt style={{ color: "#a62626" }} />
          <p style={{ color: "#a62626" }}> همه دسته بندی ها</p>
        </li>
        {data?.data.categories.map((item) => (
          <React.Fragment key={item._id}>
            <li
              onClick={() => setCategory(item.slug)}
              className={styles.parent}
            >
              <img src={`${item.icon}.svg`} />
              <p
                className={`${item.slug === category ? styles.selected : null}`}
              >
                {item.name}
              </p>
            </li>
            <ul className={styles.childrens}>
              {item.children.length > 0
                ? item.children.map((ch) => (
                    <li key={ch._id} onClick={() => setCategory(ch.slug)}>
                      <p
                        className={`${
                          ch.slug === category ? styles.selected : null
                        }`}
                      >
                        {ch.name}
                      </p>
                    </li>
                  ))
                : null}
            </ul>
          </React.Fragment>
        ))}
      </ul>
      <div className={styles.priceSelect}>
        <h5>محدوده قیمت:</h5>
        <div>
          <label htmlFor="lowprice">حداقل </label>
          <input type="text" id="lowprice" name="lowprice" />
        </div>
        <div>
          <label htmlFor="lowprice">حداکثر </label>
          <input type="text" id="lowprice" name="lowprice" />
        </div>
      </div>
      <div className={styles.footer}>
        <p>درباره ما</p>
        <p>کسب و کارها</p>
        <p>اتاق خبر</p>
        <p>پشتیبانی و قوانین</p>
        <p>اتاق خبر</p>
      </div>
    </div>
  );
}

export default Sidebar;
