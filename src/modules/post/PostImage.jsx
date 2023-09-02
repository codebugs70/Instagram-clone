import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
/* ====================================================== */

const PostImage = ({
  images = [],
  className = "w-full h-full rounded-sm img-cover",
}) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      grabCursor={true}
      navigation={true}
      modules={[Navigation]}
      className="rounded-sm mySwiper"
    >
      {images.length > 0 &&
        images.map((item) => (
          <SwiperSlide key={v4()}>
            <img className={`${className}`} src={item} alt="post-image" />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

PostImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default PostImage;
