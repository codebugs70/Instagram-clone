import UserAvatar from "../modules/user/UserAvatar";
import useQuerySnapshot from "../hooks/useQuerySnapshot";
import useQueryCollection from "../hooks/useQueryCollection";
import React, { useState } from "react";
import PostPreviewItem, {
  PostPreviewItemSkeleton,
} from "../modules/post/PostPreviewItem";
import Button from "../components/button/Button";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import { BsBookmarkPlus } from "react-icons/bs";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import UpdateUserModal from "../modules/modal/UpdateUserModal";
import useToggle from "../hooks/useToggle";
import useFetchSubCollection from "../hooks/useFetchSubCollection";
import ButtonFollow from "../components/button/ButtonFollow";
/* ====================================================== */

const Profile = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { data: user } = useQuerySnapshot("users", "slug", slug);
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();
  const [selected, setSelected] = useState("Posts");

  const { data: posts, isLoading } = useQueryCollection(
    "posts",
    "userId",
    user?.userId
  );
  const { data: following } = useFetchSubCollection(
    "users",
    user?.userId,
    "following"
  );
  const { data: followers } = useFetchSubCollection(
    "users",
    user?.userId,
    "followers"
  );

  const tabOptions = [
    { name: "Posts", icon: <MdOutlinePostAdd />, href: `/${slug}` },
    { name: "Saved", icon: <BsBookmarkPlus />, href: `/${slug}/saved` },
  ];

  const isSavedRoute = location.pathname === `/${slug}/saved`;
  return (
    <section className="px-3 pb-20 md:px-6">
      <div className="flex flex-col items-start gap-6 md:flex-row md:gap-14">
        <UserAvatar
          className="mx-auto md:mx-0"
          size="lg"
          avatar={user?.photoURL}
        />

        <div className="flex flex-col w-full gap-4 md:gap-6">
          <div className="flex items-center justify-center gap-6 md:justify-start">
            <h1 className="text-lg">{user?.username}</h1>

            {currentUser?.userId === user?.userId ? (
              <Button
                onClick={handleShowModal}
                className="text-sm"
                size="small"
                variant="secondary"
              >
                Edit profile
              </Button>
            ) : (
              <ButtonFollow uid={user?.userId} />
            )}
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <span>{posts.length}</span>
              Posts
            </div>
            <div className="flex items-center gap-1">
              <span>{followers.length}</span>
              Followers
            </div>
            <div className="flex items-center gap-1">
              <span>{following.length}</span>
              Following
            </div>
          </div>

          <p>{`@${user?.slug}`}</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-slate-700 mt-10"></div>

      {currentUser?.userId === user?.userId && (
        <ul className="flex items-center gap-5 mt-6">
          {tabOptions.map((item) => {
            return (
              <Link
                to={`${item.href}`}
                onClick={() => setSelected(item.name)}
                className={`${
                  selected === item.name
                    ? "dark:bg-white bg-BlueForst hover:bg-ElectricBlue text-white dark:text-black dark:hover:bg-opacity-80  border-transparent"
                    : "border-black dark:border-white border dark:hover:bg-white dark:hover:bg-opacity-20 dark:text-white"
                } flex items-center gap-2 px-4 md:px-6 py-2 text-sm md:text-base md:py-3 font-medium transition-all rounded-lg cursor-pointer border`}
                key={item.name}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </ul>
      )}

      <div className="my-5 md:my-10">
        {!isSavedRoute && (
          <ul className="grid grid-cols-2 gap-1 md:grid-cols-3">
            {isLoading &&
              Array(9)
                .fill(0)
                .map(() => <PostPreviewItemSkeleton key={v4()} />)}

            {!isLoading &&
              posts.length > 0 &&
              posts.map((post) => <PostPreviewItem key={v4()} data={post} />)}
          </ul>
        )}

        <Outlet />
      </div>

      <UpdateUserModal isOpen={showModal} onClose={handleShowModal} />
    </section>
  );
};

export default Profile;
