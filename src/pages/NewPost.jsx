import React, { useState } from "react";
import SetCategory from "src/components/module/SetCategory";
import AddPost from "src/components/templates/AddPost";
import PostList from "src/components/templates/PostList";

function NewPost() {
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
      <AddPost myCategory={myCategory} />
      <PostList />
    </div>
  );
}

export default NewPost;
