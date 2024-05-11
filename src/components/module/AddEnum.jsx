import React, { useState } from "react";

//styles
import styles from "./AddEnum.module.css";

function AddEnum({ form, setForm, myType }) {
  //
  //

  const [test, setTest] = useState([]);

  const enumChangeHandler = (e, index) => {
    const { value } = e.target;
    const mylist = [...form[myType]];
    mylist[index] = value;
    setForm({ ...form, [myType]: mylist });
  };

  const addItemHandler = (e) => {
    e.preventDefault();
    setTest([...test, ""]);
    console.log(form);
  };

  const enumDeletHandler = (e, index) => {
    e.preventDefault();
    const list = [...test];
    list.splice(index, 1);
    setTest(list);
  };
  return (
    <div className={styles.container}>
      <p>مقادیر آرایه</p>
      {test.map((i, index) => (
        <div key={index} className={styles.card}>
          <input
            type="text"
            value={i}
            onChange={(e) => enumChangeHandler(e, index)}
          />
          <button
            onClick={(e) => enumDeletHandler(e, index)}
            className={styles.remove}
          >
            حذف
          </button>
        </div>
      ))}
      <button onClick={(e) => addItemHandler(e)} className={styles.add}>
        افزودن
      </button>
    </div>
  );
}

export default AddEnum;
