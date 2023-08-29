import React from "react";
import { BiImageAdd } from "react-icons/bi";
import PropTypes from "prop-types";

const PostUpload = ({ onChange = () => {} }) => {
  return (
    <label
      htmlFor="choose-image"
      className="flex flex-col items-center border-MidnightSlate dark:border-white justify-center gap-4 border border-dashed dark:hover:bg-white hover:bg-[#eee] dark:hover:bg-opacity-10 transition-all cursor-pointer rounded-full w-[200px] h-[200px]"
    >
      <BiImageAdd className="text-4xl" />
      <p>Choose Images</p>
      <input
        onChange={onChange}
        type="file"
        id="choose-image"
        className="hidden-input "
        multiple
      />
    </label>
  );
};

/* Add PropsTypes */
PostUpload.propTypes = {
  onChange: PropTypes.func,
};

export default PostUpload;
