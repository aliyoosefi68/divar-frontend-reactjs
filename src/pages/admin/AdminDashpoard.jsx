//styles
import styles from "./AdminDashboard.module.css";
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
import DashboardSlider from "src/components/module/DashboardSlider";
function AdminDashboard() {
  var today = new Date();
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.posts}>
            <div className={styles.postsInfo}>
              <span>
                <MdCallReceived />
                تعداد کل آگهی ها
              </span>
              <span>{e2p(245)} عدد</span>
            </div>
            <div className={styles.postsInfo}>
              <span>
                <FaCheckCircle />
                منتشر شده ها
              </span>
              <span>{e2p(125)} عدد</span>
            </div>
            <div className={styles.postsInfo}>
              <span>
                <VscSyncIgnored />
                رد شده ها
              </span>
              <span>{e2p(50)} عدد</span>
            </div>
            <div className={styles.postsInfo}>
              <span>
                <MdOutlineDownloading />
                در انتظار تایید
              </span>
              <span>{e2p(50)} عدد</span>
            </div>
            <button>
              <IoIosAddCircleOutline />
            </button>
            <TbSpeakerphone className={styles.cardImages} />
          </div>
          <div className={styles.users}>
            <div className={styles.postsInfo}>
              <span>فروشنده ها</span>
              <span style={{ fontSize: "4rem" }}>{e2p(245)} عدد</span>
            </div>
            <div className={styles.postsInfo}>
              <span>
                <RiEmotionLine />
                کاربران آنلاین
              </span>
              <span>{e2p(125)} عدد</span>
            </div>
            <div className={styles.postsInfo}>
              <span>
                <ImSleepy />
                کاربران آفلاین
              </span>
              <span>{e2p(50)} عدد</span>
            </div>
            <GrUserExpert className={styles.cardImages} />
          </div>
        </div>
        <DashboardSlider className={styles.slider} />
      </div>
    </div>
  );
}

export default AdminDashboard;
