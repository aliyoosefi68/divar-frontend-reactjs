import React, { useEffect, useState } from "react";
import styles from "./PostPage.module.css";

//icons
import { GoShareAndroid } from "react-icons/go";
import ImagesProduct from "../module/ImagesProduct";
import { FaSignalMessenger } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

//functions
import { e2p, sp } from "src/utils/numbers";

function PostPage({ data }) {
  const [category, setCategory] = useState("");
  const [showModal, setShowmodal] = useState(false);
  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch(
        `http://localhost:3000/category/${data.category}`
      );
      const ourData = await res.json();
      setCategory(ourData?.category.name);
    };
    getCategory();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.breadcramp}>
        <span>دسته بندی: </span>
        <span>{category}</span>
      </div>
      <div className={styles.detailes}>
        <div className={styles.options}>
          <h2>{data.title}</h2>
          <span className={styles.date}>
            تاریخ انتشار :{new Date(data.createdAt).toLocaleDateString("fa-IR")}
          </span>
          <div className={styles.city}>
            <span>شهر : </span>
            <span>{data.options.city} </span>
          </div>

          <div className={styles.contact}>
            <button onClick={() => setShowmodal(true)}>اطلاعات تماس</button>
            <GoShareAndroid />
          </div>
          <div className={styles.price}>
            <span>قیمت : </span>
            <span>{sp(data.amount)} تومان</span>
          </div>
          <div className={styles.extraDetailes}>
            {Object.keys(data.options).map((key) => (
              <div key={key}>
                {key !== "city" ? (
                  <div className={styles.detailesOp}>
                    <span>{key}:</span> {e2p(data.options[key])}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className={styles.content}>
            <h4>توضیحات</h4>
            <p>{data.content}</p>
          </div>
        </div>
        <div className={styles.images}>
          <ImagesProduct images={data.images} />
          <div className={styles.note}>
            <h4>نظرات خود را وارد کنید:</h4>
            <input type="text" placeholder="ایمیل خود را وارد کنید" />
            <textarea placeholder="متن نظرات شما ..."></textarea>
          </div>
        </div>
      </div>

      {showModal && <div className={styles.modalBackground}></div>}
      {showModal && (
        <div className={styles.modal}>
          <IoMdClose
            className={styles.closeButton}
            onClick={() => setShowmodal(false)}
          />
          <h4>ارتباط با آگهی دهنده</h4>
          <div>
            <FaSignalMessenger />
            <FiPhoneCall />
            <IoMailUnreadOutline />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPage;
