import React from "react";
import PropTypes from "prop-types";

const Input = ({
  type = "text",
  placeholder,
  className = "",
  register,
  name,
  error,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`${className} w-full p-4 bg-transparent border focus:border-BlueForst border-text_3 rounded-md outline-none bg-slate-100 dark:bg-SlateGray dark:focus:border-white`}
      />
      {error && (
        <p className="font-medium text-RaspberryRed">{error.message}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  register: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default Input;
