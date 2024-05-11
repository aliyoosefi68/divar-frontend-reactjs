import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCategory, getCategory } from "services/admin";

//styles
import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
    parent: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  const { data: getData } = useQuery(["get-categories"], getCategory);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    if (form.parent === "") delete form.parent;
    mutate(form);
  };
  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید:</h3>
      {!!error && <p>مشکلی پیش آمده است!</p>}
      {data?.status === 201 && <p>آگهی با موفقیت ایجاد شد</p>}

      <div>
        <label htmlFor="parent">دسته بندی مادر</label>
        <select name="parent" id="parent">
          <option value="">انتخاب دسته بندی</option>
          {getData?.data?.categories.map((item) => {
            return (
              <React.Fragment key={item._id}>
                <option value={item._id}>{item.name}</option>
                {item?.children.length > 0 &&
                  item.children.map((newItem) => (
                    <option
                      key={newItem._id}
                      value={newItem._id}
                      className={styles.innerOption}
                    >
                      <div>{newItem.name}</div>
                    </option>
                  ))}
              </React.Fragment>
            );
          })}
        </select>
      </div>
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />

      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
