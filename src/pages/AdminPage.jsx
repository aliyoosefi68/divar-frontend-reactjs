import React from "react";
import AdminSidebar from "src/components/module/AdminSidebar";
import AdminContent from "src/components/templates/AdminContent";

import styles from "./AdminPage.module.css";

function AdminPage({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <AdminSidebar data={data} />
      </div>
      <div className={styles.content}>
        <AdminContent />
      </div>
    </div>
  );
}

export default AdminPage;
