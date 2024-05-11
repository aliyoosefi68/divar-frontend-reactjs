import React, { useState } from "react";
import SetCategory from "src/components/module/SetCategory";
import OptionForm from "src/components/templates/OptionForm";

function Options() {
  const [myCategory, setMyCategory] = useState("");

  if (!myCategory) {
    return (
      <div>
        <SetCategory myCategory={myCategory} setMyCategory={setMyCategory} />
      </div>
    );
  }
  return (
    <div>
      <OptionForm myCategory={myCategory} />
    </div>
  );
}

export default Options;
