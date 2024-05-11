import React, { useState } from "react";

function AddTest() {
  const clickHandler = (e) => {
    e.preventDefault();
    setTest([...test, ""]);
  };
  const changeHandler = (e, index) => {
    const value = e.target.value;
    const list = [...test];
    list[index] = value;
    setTest(list);
  };

  return (
    <div>
      {/* <h3>items</h3>
      {test.map((i, index) => (
        <input
          type="text"
          value={i}
          onChange={(e) => changeHandler(e, index)}
        />
      ))}
      <button onClick={(e) => clickHandler(e)}>add</button> */}
    </div>
  );
}

export default AddTest;
