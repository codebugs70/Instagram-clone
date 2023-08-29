import React from "react";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore, MdOutlineDashboardCustomize } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuDropdown from "../menu/MenuDropdown";
import UserAvatar from "../../modules/user/UserAvatar";
import NavItem from "../nav/NavItem";
import useToggle from "../../hooks/useToggle";
import CreatePostModal from "../../modules/modal/CreatePostModal";
/* ====================================================== */

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();

  const togglePost = () => {
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
    {
      link: "Notification",
      path: "/notification",
      icon: <AiOutlineHeart />,
    },
    {
      link: "Create",
      icon: <MdOutlineDashboardCustomize />,
      onClick: togglePost,
    },
  ];

  return (
    <React.Fragment>
      <section className="w-[250px] sticky top-0 flex flex-col  bg-white shadow-xl dark:bg-black border-r h-screen border-[#ccc] dark:border-SlateGray p-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-[40px] h-[40px]">
            <img src="/logo.png" className="img-cover" alt="" />
          </div>
          <h1 className="text-2xl font-bold ">Instagram</h1>
        </Link>

        <ul className="flex flex-col flex-1 gap-3 mt-8">
          {sidebarLinks.map((item) => {
            if (item.onClick) {
              return (
                <NavItem
                  key={item.link}
                  icon={item.icon}
                  link={item.link}
                  onClick={item.onClick}
                />
              );
            }

            return (
              <NavItem
                key={item.link}
                path={item.path}
                icon={item.icon}
                link={item.link}
                onClick={item.onClick}
              />
            );
          })}

          <NavLink
            to={`/${currentUser.slug}`}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-BlueForst text-white dark:bg-SlateGray font-semibold "
                  : "hover:bg-blue-500 hover:bg-opacity-10 dark:hover:text-white hover:text-ElectricBlue dark:hover:bg-SlateGray "
              } flex items-center gap-3 p-[12px] transition-all rounded-md cursor-pointer `
            }
          >
            <UserAvatar
              size="xs"
              avatar={"https://source.unsplash.com/random"}
            />
            <span className="text-base font-semibold">
              {currentUser.username}
            </span>
          </NavLink>
        </ul>

        <MenuDropdown />
      </section>

      <CreatePostModal isOpen={showModal} onClose={handleShowModal} />
    </React.Fragment>
  );
};

export default LeftSidebar;
