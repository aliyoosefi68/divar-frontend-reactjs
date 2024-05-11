import React from "react";
import { useQuery } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "services/admin";
import { useNavigate } from "react-router-dom";
import Loader from "../module/Loader";

//styles
import styles from "./CategoryList.module.css";

//icons
import { FaTrashAlt } from "react-icons/fa";

function CategoryList() {
  const { data, isLoading } = useQuery(["get-categories"], getCategory);

  const deleteHandler = (id) => {
    deleteCategory(id);
  };

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data?.data.categories.map((i) => (
          <React.Fragment key={i._id}>
            <div className={styles.main}>
              <img src={`${i.icon}.svg`} alt="" />
              <h5>{i.name}</h5>
              <p>slug:{i.slug}</p>
              <p>id:{i._id}</p>
              <button onClick={() => deleteHandler(i._id)}>
                <FaTrashAlt />
              </button>
            </div>
            {i.children.length > 0 ? (
              <div className={styles.child}>
                <ul>
                  {i.children.map((ch) => (
                    <li key={ch._id}>
                      <img src={`${ch.icon}.svg`} alt="" />
                      <h5>{ch.name}</h5>
                      <p>slug:{ch.slug}</p>
                      <p>id:{ch._id}</p>
                      <button onClick={() => deleteHandler(ch._id)}>
                        <FaTrashAlt />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </React.Fragment>
        ))
      )}
    </div>
  );
}

export default CategoryList;
