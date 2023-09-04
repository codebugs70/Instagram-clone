import React from "react";
import PropTypes from "prop-types";

const Loading = ({
  className = "border-BlueForst",
  borderSize = "border-4 border-t-4",
  size = "w-[80px] h-[80px]",
}) => {
  return (
    <div
      className={`${className} ${borderSize} ${size} flex  items-center justify-center mx-auto bg-transparent rounded-full border-t-transparent animate-spin`}
    ></div>
  );
};

Loading.propTypes = {
  borderSize: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Loading;
