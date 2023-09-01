import React, { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { v4 } from "uuid";
import { Menu, Transition } from "@headlessui/react";
import { BsImages, BsSquare } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { IoResizeOutline } from "react-icons/io5";
import PropTypes from "prop-types";
/* ====================================================== */

const options = [
  { label: "Original", icon: <BsImages /> },
  { label: "1:1", icon: <BsSquare /> },
];

const PostDisplayImages = ({ images = [], onChange = () => {}, setImages }) => {
  const [imageSize, setImageSize] = useState("1:1");

  const handleDeleteImage = (url) => {
    if (!url) return;
    const filterImage = images.filter((item) => item !== url);
    setImages([...filterImage]);
  };

  if (!images) return null;
  return (
    <Swiper
      slidesPerView={1}
      grabCursor={true}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper w-[567px]"
    >
      {images.length > 0 &&
        images.map((item) => (
          <SwiperSlide className="relative" key={v4()}>
            <img
              className={`${
                imageSize === "1:1"
                  ? "w-[567px] h-[567px] object-cover"
                  : "w-full h-[567px] object-contain"
              }  transition-all `}
              src={item}
              alt="post-image"
            />

            <div className="absolute top-2 right-2">
              <span
                onClick={() => handleDeleteImage(item)}
                className="icon-image"
              >
                <IoMdClose></IoMdClose>
              </span>
            </div>

            {/* image options */}
            <div className="absolute w-full bottom-2 left-2">
              <div className="flex items-center gap-4">
                <OptionDropdown setImageSize={setImageSize} />
                <label
                  htmlFor="choose-image"
                  className="icon-image text-[22px]"
                >
                  <BiImageAdd />
                  <input
                    onChange={onChange}
                    type="file"
                    id="choose-image"
                    className="hidden-input "
                    multiple
                  />
                </label>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

PostDisplayImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  setImages: PropTypes.func,
};

export default PostDisplayImages;

function OptionDropdown({ setImageSize }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <span className="icon-image">
          <IoResizeOutline />
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute min-w-[120px] p-2 z-40 origin-bottom bg-[#F5F5F5] rounded-md shadow-lg bottom-14 dark:text-white dark:bg-SlateGray">
          {options.map((item) => (
            <Menu.Item key={item.label} as={Fragment}>
              {({ active }) => (
                <li
                  onClick={() => setImageSize(item.label)}
                  className={`${
                    active ? "bg-white bg-opacity-10" : ""
                  } w-full flex items-center gap-2 p-3 cursor-pointer`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

OptionDropdown.propTypes = {
  setImageSize: PropTypes.func,
};
