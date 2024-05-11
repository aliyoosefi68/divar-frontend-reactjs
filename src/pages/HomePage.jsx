import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Main from "src/components/templates/Main";
import Sidebar from "src/components/templates/Sidebar";
import { getAllPosts } from "src/services/user";

const style = {
  display: "flex",
  gap: "20px",
};
function HomePage() {
  const { data, isLoading } = useQuery(["post-list"], getAllPosts);
  const [category, setCategory] = useState("");

  return (
    <div style={style}>
      <Sidebar category={category} setCategory={setCategory} />
      <Main
        posts={data?.data.posts}
        isLoading={isLoading}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
}

export default HomePage;
