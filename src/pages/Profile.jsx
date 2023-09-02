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
/* ====================================================== */

const Profile = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { data: user } = useQuerySnapshot("users", "slug", slug);
  const [selected, setSelected] = useState("Posts");

  const { data: posts, isLoading } = useQueryCollection(
    "posts",
    "userId",
    user?.userId
  );

  const tabOptions = [
    { name: "Posts", icon: <MdOutlinePostAdd />, href: `/${slug}` },
    { name: "Saved", icon: <BsBookmarkPlus />, href: `/${slug}/saved` },
  ];

  const isSavedRoute = location.pathname === `/${slug}/saved`;

  return (
    <section className="px-6">
      <div className="flex items-start gap-14">
        <UserAvatar size="lg" avatar={user?.photoURL} />

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <h1 className="text-lg">{user?.username}</h1>

            {currentUser?.userId === user?.userId && (
              <Button className="text-sm" size="small" variant="secondary">
                Edit profile
              </Button>
            )}
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <span>2</span>
              Posts
            </div>
            <div className="flex items-center gap-1">
              <span>12</span>
              Followers
            </div>
            <div className="flex items-center gap-1">
              <span>25</span>
              Posts
            </div>
          </div>

          <p>{`@${user?.slug}`}</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-slate-700 mt-10"></div>

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
              } flex items-center gap-2 px-6 py-3 font-medium transition-all rounded-lg cursor-pointer border`}
              key={item.name}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </ul>

      <div className="my-10">
        {!isSavedRoute && (
          <ul className="grid grid-cols-3 gap-1">
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
    </section>
  );
};

export default Profile;
