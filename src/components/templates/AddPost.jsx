import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "src/services/admin";
import { getCookie } from "src/utils/cookie";

//styles
import styles from "./AddPost.module.css";

//toast
import toast, { Toaster } from "react-hot-toast";
import LabelImage from "../module/LabelImage";

function AddPost({ myCategory }) {
  const { data } = useQuery(["get-categories"], getCategory);
  const [form, setForm] = useState({
    title: "",
    content: "",
    city: "",
    category: myCategory,
    amount: null,
    images: [],
    options: {},
  });
  let optionKey = [];

  const [getOption, setGetOption] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      const res = await fetch(
        `http://localhost:3000/option/by-category/${myCategory}`
      );
      const data = await res.json();
      setGetOption(data);
      optionKey = getOption.map((item) => item.title);
    };
    getOptions();
  }, []);

  const addHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (let i in form) {
      if (i === "images") {
        form[i].forEach((image) => {
          formData.append("images", image); // افزودن همه تصاویر به فرم داده
        });
      } else if (i == "options") {
        for (let option in form.options) {
          formData.append(option, form.options[option]);
        }
      } else {
        formData.append(i, form[i]);
      }
    }

    const token = getCookie("accessToken");

    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      .catch((error) => toast.error("مشکلی پیش آمده است!"));
  };

  const changeHandler = (event) => {
    const name = event.target.name;

    if (name !== "images") {
      if (
        name === "title" ||
        name === "content" ||
        name === "city" ||
        name === "amount"
      ) {
        setForm({ ...form, [name]: event.target.value });
      } else {
        setForm({
          ...form,
          options: {
            ...form.options,
            [name]: event.target.value,
          },
        });
      }

      console.log(form);
    } else {
      const images = Array.from(event.target.files); // تبدیل FileList به آرایه
      setForm({
        ...form,
        [name]: images,
      });
    }
  };

  return (
    <>
      <form onChange={changeHandler} className={styles.form}>
        <h3>افزودن آگهی:</h3>
        <label htmlFor="title">عنوان آگهی</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="content">توضیحات آگهی</label>
        <textarea name="content" id="content"></textarea>
        <label htmlFor="amount">قیمت</label>
        <input type="number" name="amount" id="amount" />
        <label htmlFor="city">شهر</label>
        <input type="text" name="city" id="city" />

        {getOption.length > 0
          ? getOption.map((option) => (
              <React.Fragment key={option._id}>
                {option.type !== "array" ? (
                  <div>
                    <label htmlFor={option.title}>{option.title}</label>
                    <input
                      type={option.type}
                      name={option.title}
                      id={option.title}
                    />
                  </div>
                ) : (
                  <select name={option.title} id={option.title}>
                    <option>انتخاب {option.title}</option>
                    {option?.list.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                )}
              </React.Fragment>
            ))
          : null}

        <div className={styles.containeImage}>
          <label htmlFor="images">
            <LabelImage />
          </label>
          <input type="file" name="images" id="images" multiple />
        </div>
        <div>
          {form.images && form.images.length > 0 && (
            <div className={styles.imageContainer}>
              <h4>تصاویر انتخاب شده:</h4>
              <ul>
                {form.images.map((image, index) => (
                  <li key={index}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index + 1}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button onClick={addHandler}>ایجاد</button>
        <div>
          <Toaster />
        </div>
      </form>
    </>
  );
}

export default AddPost;
