import React from "react";
import Loading from "../loading/Loading";
import PropTypes from "prop-types";

const Button = ({
  children,
  onClick = () => {},
  type = "button",
  className = "",
  isLoading,
  variant = "primary",
  size = "normal",
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "bg-BlueForst hover:bg-ElectricBlue text-white";
      case "secondary":
        return "dark:bg-white dark:hover:bg-opacity-80 hover:bg-opacity-80 bg-blue-500 text-white dark:text-black";
      case "bordered":
        return "dark:border-white border-ElectricBlue hover:bg-ElectricBlue hover:text-white text-ElectricBlue border hover:border-transparent dark:hover:bg-white dark:text-white dark:hover:text-black transition-all";

      default:
        return "";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "py-2 px-4";
      case "normal":
        return "px-5 h-[48px]";
      case "big":
        return "p-5";

      default:
        return "";
    }
  };

  const variantClass = getVariantClass();
  const sizeClass = getSizeClass();

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      className={`${className} ${variantClass} ${sizeClass} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      } font-medium rounded-md`}
    >
      {isLoading ? (
        <Loading
          className="border-white"
          borderSize="border-2 border-t-2"
          size="w-[20px] h-[20px]"
        />
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "bordered"]),
  size: PropTypes.oneOf(["small", "normal", "big"]),
};

export default Button;
