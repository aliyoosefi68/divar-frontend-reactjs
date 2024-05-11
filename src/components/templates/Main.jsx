import React, { useContext, useEffect, useState } from "react";
import Loader from "../module/Loader";

//icons
import { TbMessage2Search } from "react-icons/tb";

//functions
import { sp } from "src/utils/numbers";

//styles
import styles from "./Main.module.css";
import { Link } from "react-router-dom";
import Pagination from "../module/Pagination";
import { PostContext } from "src/context/PostContext";

let pageSize = 9;
let pageNumbers;
let allShownPosts = [];

const baseURL = import.meta.env.VITE_BASE_URL;

function Main({ isLoading, category }) {
  const [postData, setPostData] = useState([]);
  const [paginatedPost, setPaginatedPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { city } = useContext(PostContext);

  useEffect(() => {
    fetch(`http://localhost:3000/?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (city === "همه شهرها") {
          setPostData(data.posts);
        } else {
          const filterData = data?.posts.filter(
            (item) => item.options.city === city
          );
          setPostData(filterData);
        }

        let endIndex = currentPage * pageSize;
        let startIndex = endIndex - pageSize;
        allShownPosts = postData.slice(startIndex, endIndex);
        setPaginatedPost(allShownPosts);
      });
  }, [currentPage, category, postData, allShownPosts, paginatedPost, city]);
  const pageCount = Math.ceil(postData.length / pageSize);
  pageNumbers = Array.from(Array(pageCount).keys());

  if (isLoading) return <Loader />;
  if (paginatedPost.length < 1)
    return (
      <section className={styles.emptyResult}>
        <TbMessage2Search />

        <h5>هیچ آگهی وجود ندارد</h5>
      </section>
    );
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        {paginatedPost.map((item) => (
          <Link key={item._id} to={`/${item._id}`}>
            <div className={styles.card}>
              <div className={styles.info}>
                <p className={styles.title}>{item.title}</p>
                <div>
                  <p>{sp(item.amount)} تومان</p>
                  <span>{item.options.city}</span>
                </div>
              </div>
              <img src={`${baseURL}${item.images[0]}`} />
            </div>
          </Link>
        ))}
      </div>
      {pageNumbers.length > 1 && (
        <Pagination
          pagesNumbers={pageNumbers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}

export default Main;
