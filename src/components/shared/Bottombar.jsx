import useToggle from "../../hooks/useToggle";
import React from "react";
import CreatePostModal from "../../modules/modal/CreatePostModal";
import { useSelector } from "react-redux";
import { MdOutlineDashboardCustomize, MdOutlineExplore } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
/* <===============================================================> */

const navLinkStyles = `flex flex-col items-center justify-center gap-1 rounded-full `;

const BottomBar = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();

  const togglePost = () => {
    if (!currentUser) navigate("/sign-in");
    handleShowModal();
  };

  // Nav Link Data
  const navLink = [
    {
      link: "Home",
      path: "/",
      icon: <AiOutlineHome />,
    },
    {
      link: "Explore",
      path: "/explore",
      icon: <MdOutlineExplore />,
    },
    {
      link: "Create",
      icon: <MdOutlineDashboardCustomize />,
      onClick: togglePost,
    },
    {
      link: "Search",
      path: "/search",
      icon: <IoSearch />,
    },
  ];

  return (
    <React.Fragment>
      <section className="fixed bottom-0 left-0 right-0 z-50 py-3 bg-white shadow-md dark:bg-black lg:hidden ">
        <ul className="flex items-center justify-around">
          {navLink.map((item) => {
            if (item.onClick) {
              return (
                <div
                  onClick={item.onClick}
                  to={item.path}
                  className={navLinkStyles}
                  key={item.name}
                >
                  <span className="text-2xl ">{item.icon}</span>
                </div>
              );
            } else {
              return (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${isActive ? `text-BlueForst` : ""} ${navLinkStyles}`
                  }
                  key={item.name}
                >
                  <span className="text-2xl ">{item.icon}</span>
                </NavLink>
              );
            }
          })}
          <Link
            to={`/${currentUser?.slug}`}
            className="flex-shrink-0 w-[35px] h-[35px] rounded-full"
          >
            <img
              src={currentUser?.photoURL}
              className="rounded-full img-cover"
              alt=""
            />
          </Link>
        </ul>
      </section>

      <CreatePostModal isOpen={showModal} onClose={handleShowModal} />
    </React.Fragment>
  );
};

export default BottomBar;
