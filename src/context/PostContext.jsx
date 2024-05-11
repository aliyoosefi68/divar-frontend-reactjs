import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { getAllPosts } from "src/services/user";

export const PostContext = createContext();
function PostContextProvider({ children }) {
  const { data, isLoading } = useQuery(["post-list"], getAllPosts);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("همه شهرها");

  useEffect(() => {
    const allCities = data?.data.posts.map((post) => post.options.city);
    const uinqueCities = ["همه شهرها", ...new Set(allCities)];
    setCities(uinqueCities);
  }, [data, city]);
  return (
    <PostContext.Provider value={{ cities, city, setCity }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;
