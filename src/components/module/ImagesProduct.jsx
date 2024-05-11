import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./ImagesProduct.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const baseURL = import.meta.env.VITE_BASE_URL;

function ImagesProduct({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <>
          {images.map((image) => (
            <SwiperSlide>
              <img src={`${baseURL}${image}`} />
            </SwiperSlide>
          ))}
        </>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper"
      >
        <>
          {images.map((image) => (
            <SwiperSlide>
              <img src={`${baseURL}${image}`} />
            </SwiperSlide>
          ))}
        </>
      </Swiper>
    </>
  );
}

export default ImagesProduct;
