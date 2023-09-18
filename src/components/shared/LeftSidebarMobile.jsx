import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore, MdOutlineDashboardCustomize } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuDropdown from "../menu/MenuDropdown";
import UserAvatar from "../../modules/user/UserAvatar";
import useToggle from "../../hooks/useToggle";
import CreatePostModal from "../../modules/modal/CreatePostModal";
/* ====================================================== */

const LeftSidebarMobile = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();

  const togglePost = () => {
    if (!currentUser) navigate("/sign-in");
    handleShowModal();
  };

  const sidebarLinks = [
    {
      link: "Home",
      path: "/",
      icon: <AiOutlineHome />,
    },
    {
      link: "Search",
      path: "/search",
      icon: <IoSearch />,
    },
    {
      link: "Explore",
      path: "/explore",
      icon: <MdOutlineExplore />,
    },
    // {
    //   link: "Notification",
    //   path: "/notification",
    //   icon: <AiOutlineHeart />,
    // },
    {
      link: "Create",
      icon: <MdOutlineDashboardCustomize />,
      onClick: togglePost,
    },
  ];

  return (
    <React.Fragment>
      <section className="w-[80px] sticky top-0 z-[999]  hidden lg:flex xl:hidden flex-col items-center justify-center  bg-white shadow-xl dark:bg-black border-r h-screen border-[#ccc] dark:border-SlateGray p-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-[40px] h-[40px]">
            <img src="/logo.png" className="img-cover" alt="" />
          </div>
        </Link>

        <ul className="flex flex-col flex-1 gap-3 mt-8">
          {sidebarLinks.map((item) => {
            if (item.path && typeof item.path === "string") {
              return (
                <NavLink
                  key={item.link}
                  to={`${item.path}`}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-BlueForst text-white dark:bg-SlateGray font-semibold"
                        : "hover:bg-blue-500 dark:hover:text-white hover:bg-opacity-10 hover:text-ElectricBlue dark:hover:bg-SlateGray "
                    } transition-all rounded-md cursor-pointer w-[50px] h-[50px] flex items-center justify-center`
                  }
                >
                  <span className="text-2xl">{item.icon}</span>
                </NavLink>
              );
            }

            return (
              <li
                key={item.link}
                onClick={item.onClick}
                className="flex items-center gap-3 w-[50px] h-[50px] justify-center transition-all dark:hover:bg-SlateGray rounded-md cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-ElectricBlue dark:hover:text-white"
              >
                <span className="text-2xl">{item.icon}</span>
              </li>
            );
          })}

          <NavLink
            to={`/${currentUser?.slug}`}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-BlueForst text-white dark:bg-SlateGray font-semibold "
                  : "hover:bg-blue-500 hover:bg-opacity-10 dark:hover:text-white hover:text-ElectricBlue dark:hover:bg-SlateGray "
              } transition-all rounded-md cursor-pointer w-[50px] h-[50px] flex items-center justify-center`
            }
          >
            <UserAvatar size="xs" avatar={currentUser?.photoURL} />
          </NavLink>
        </ul>

        <MenuDropdown />
      </section>

      <CreatePostModal isOpen={showModal} onClose={handleShowModal} />
    </React.Fragment>
  );
};

export default LeftSidebarMobile;
