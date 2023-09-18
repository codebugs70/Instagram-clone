import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ icon, link, path, onClick = () => {} }) => {
  if (path && typeof path === "string") {
    return (
      <NavLink
        to={`${path}`}
        className={({ isActive }) =>
          `${
            isActive
              ? "bg-BlueForst text-white dark:bg-SlateGray font-semibold"
              : "hover:bg-blue-500 dark:hover:text-white hover:bg-opacity-10 hover:text-ElectricBlue dark:hover:bg-SlateGray "
          } flex items-center gap-3 p-[12px] transition-all rounded-md cursor-pointer`
        }
      >
        <span className="text-2xl ">{icon}</span>
        <span className="text-lg">{link}</span>
      </NavLink>
    );
  }

  return (
    <li onClick={onClick} className="nav-item ">
      <span className="text-2xl ">{icon}</span>
      <span className="text-lg ">{link}</span>
    </li>
  );
};

NavItem.propTypes = {
  icon: PropTypes.node,
  link: PropTypes.string,
  path: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavItem;
