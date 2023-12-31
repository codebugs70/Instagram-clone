import React from "react";
import PropTypes from "prop-types";

const Skeleton = ({ className = "", color = "" }) => {
  return (
    <div
      className={`animate-pulse bg-LightGray dark:bg-SlateGray ${className} ${color}`}
    ></div>
  );
};

/* Add PropsTypes */
Skeleton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};
export default Skeleton;
