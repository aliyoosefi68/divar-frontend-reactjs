import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

//styles
import styles from "./DashboardSlide.module.css";
import "swiper/css";

function DashboardSlider() {
  return (
    <div className={styles.swiper}>
      <h3>بیشترین آگهی ها</h3>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={3}
        className={styles.swiperSlide}
        spaceBetween={"20px"}
      >
        <SwiperSlide className={styles.swiperSlideItem}>
          اجاره آپارتمان
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlideItem}>
          اجاره ویلایی
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlideItem}>خرید گوشی</SwiperSlide>
        <SwiperSlide className={styles.swiperSlideItem}>استخدامی</SwiperSlide>
        <SwiperSlide className={styles.swiperSlideItem}>وسایل منزل</SwiperSlide>
      </Swiper>
    </div>
  );
}

export default DashboardSlider;
