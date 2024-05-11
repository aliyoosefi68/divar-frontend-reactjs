import React, { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getCategory } from "src/services/admin";

//icons
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

//styles
import styles from "./SetCategory.module.css";

function SetCategory({ myCategory, setMyCategory }) {
  const [text, setText] = useState("");
  const [myData, setMyData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    if (!text) return;

    const search = async () => {
      try {
        const res = await fetch("http://localhost:3000/category", {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.categories) {
          const newData = [];
          data?.categories.forEach((item) => {
            newData.push(item); // ابتدا هر شیء را به متغیر newData اضافه کنید
            // اگر ویژگی children دارای مقدار است، مقادیر داخل آرایه children را به newData اضافه کنید
            if (item.children && item.children.length > 0) {
              item.children.forEach((child) => {
                newData.push(child);
              });
            }
          });
          setMyData(newData);
          let filterData = myData.filter((item) => item.name.includes(text));
          setFilter(filterData);
          console.log(filterData);
        } else {
          alert("error");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    search();
    return () => {
      controller.abort();
    };
  }, [text]);

  return (
    <div className={styles.container}>
      <div>
        <h3>چه چیزی آگهی می‌کنید؟</h3>
        <p>با جستجو در کادر زیر، دستهٔ آگهی را انتخاب کنید.</p>
        <input
          type="text"
          placeholder="مثلا: اجاره مسکونی،پراید ،مبل و ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          {text ? (
            <ul className={styles.categoryList}>
              {filter.map((item) => (
                <li key={item._id} onClick={() => setMyCategory(item._id)}>
                  {item.name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {!text ? (
          <div className={styles.more_category}>
            <span>دیدن تمام دسته بندی ها</span>
            <MdOutlineKeyboardArrowLeft />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SetCategory;
