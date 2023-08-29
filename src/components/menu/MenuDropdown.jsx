import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineSetting } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { BsBookmarkCheck, BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineContactSupport } from "react-icons/md";
import { Fragment } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { useTheme } from "../../context/theme-context";

/* ====================================================== */

const MenuDropdown = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  const links = [
    { label: "Settings", icon: <AiOutlineSetting /> },
    { label: "Saved", href: "/saved", icon: <BsBookmarkCheck /> },
    {
      label: "Theme",
      icon: darkMode ? <FaMoon /> : <BsSun />,
      onClick: toggleDarkMode,
    },
    { label: "Support", icon: <MdOutlineContactSupport /> },
    { label: "Sign out", icon: <BiLogOut /> },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="w-full nav-item">
        <span className="text-2xl">
          <AiOutlineBars />
        </span>
        <span className="text-lg ">More</span>
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
        <Menu.Items className="absolute w-full p-2  origin-bottom bg-[#F5F5F5] rounded-md shadow-lg bottom-14 dark:text-white dark:bg-InkyBlack">
          {links.map((link) => (
            <Menu.Item key={link.label} as={Fragment}>
              {({ active }) => (
                <li
                  onClick={link.onClick}
                  href={link.href}
                  className={`${
                    active ? "bg-white bg-opacity-10" : ""
                  } nav-item`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="text-lg">{link.label}</span>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropdown;
