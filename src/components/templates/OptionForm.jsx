import React, { useState } from "react";

//styles
import styles from "./OptionForm.module.css";

function OptionForm({ myCategory }) {
  const [form, setForm] = useState({
    title: "",
    key: "",
    guid: "",
    category: myCategory,
    required: true,
    type: "",
    list: [],
    newValue: "", // مقدار ورودی جدید
  });

  const changeHandler = (event, index) => {
    const updatedList = [...form.list];
    updatedList[index] = event.target.value;
    setForm({ ...form, list: updatedList });
  };

  const addToList = () => {
    if (form.newValue.trim() !== "") {
      setForm({
        ...form,
        list: [...form.list, form.newValue],
        newValue: "", // پاک کردن مقدار newValue
      });
    }
  };

  const removeFromList = (index) => {
    const updatedList = form.list.filter((_, i) => i !== index);
    setForm({ ...form, list: updatedList });
  };

  const handleTypeChange = (event) => {
    const { value } = event.target;
    setForm({ ...form, type: value, newValue: "" }); // اضافه کردن newValue: "" به فرم
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(form);
    // حذف newValue از form نهایی
    const { newValue, ...formDataWithoutNewValue } = form;
    if (
      !formDataWithoutNewValue.title ||
      !formDataWithoutNewValue.key ||
      !formDataWithoutNewValue.required ||
      !formDataWithoutNewValue.type ||
      (formDataWithoutNewValue.type === "array" &&
        formDataWithoutNewValue.list.length === 0)
    ) {
      return;
    }
    const res = await fetch("http://localhost:3000/option/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: formDataWithoutNewValue }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h3>افزودن ویژگی های مورد نظر به دسته بندی</h3>

      <label htmlFor="title">نام ویژگی</label>
      <input
        type="text"
        name="title"
        id="title"
        onChange={(event) => setForm({ ...form, title: event.target.value })}
      />
      <label htmlFor="key">کلید دسترسی</label>
      <input
        type="text"
        name="key"
        id="key"
        onChange={(event) => setForm({ ...form, key: event.target.value })}
      />
      <label htmlFor="guid">راهنمایی لازم</label>
      <input
        type="text"
        name="guid"
        id="guid"
        onChange={(event) => setForm({ ...form, guid: event.target.value })}
      />

      <label htmlFor="required">ضروری بودن ویژگی</label>
      <select
        name="required"
        id="required"
        onChange={(event) => setForm({ ...form, required: event.target.value })}
      >
        <option value={true}>بله</option>
        <option value={false}>خیر</option>
      </select>
      <label htmlFor="type">نوع ویژگی</label>
      <select name="type" id="type" onChange={handleTypeChange}>
        <option value="">انتخاب نوع</option>
        <option value="string">متن</option>
        <option value="number">عدد</option>
        <option value="boolean">بولین</option>
        <option value="array">آرایه</option>
      </select>
      {form.type === "array" && (
        <div>
          <input
            type="text"
            name="newValue"
            value={form.newValue}
            onChange={(event) =>
              setForm({ ...form, newValue: event.target.value })
            }
          />
          <button type="button" onClick={addToList}>
            اضافه کردن مقدار جدید
          </button>
          {form.list.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item}
                onChange={(event) => changeHandler(event, index)}
              />
              <button type="button" onClick={() => removeFromList(index)}>
                حذف
              </button>
            </div>
          ))}
        </div>
      )}

      <button type="submit">ایجاد ویژگی</button>
    </form>
  );
}

export default OptionForm;
