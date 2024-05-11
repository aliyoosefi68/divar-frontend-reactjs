import React from "react";
import { Outlet } from "react-router-dom";

//styles
import styles from "./AdminContent.module.css";
import { e2p } from "src/utils/numbers";

//icons
import { FaCheckCircle } from "react-icons/fa";
import { VscSyncIgnored } from "react-icons/vsc";
import { MdOutlineDownloading } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import { TbSpeakerphone } from "react-icons/tb";
import { GrUserExpert } from "react-icons/gr";
import { RiEmotionLine } from "react-icons/ri";
import { ImSleepy } from "react-icons/im";

function AdminContent() {
  var today = new Date();
  return (
    <div>
      <div className={styles.time}>
        <span>تاریخ امروز:</span>
        {new Date(today).toLocaleDateString("fa-IR")}
      </div>
      <Outlet />
    </div>
  );
}

export default AdminContent;
