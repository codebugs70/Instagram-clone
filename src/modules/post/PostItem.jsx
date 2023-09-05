import useToggle from "../../hooks/useToggle";
import UserAvatar from "../user/UserAvatar";
import useQuerySnapshot from "../../hooks/useQuerySnapshot";
import Skeleton from "../../components/loading/Skeleton";
import React from "react";
import PropTypes from "prop-types";
import PostShare from "./PostShare";
import PostSave from "./PostSave";
import PostModal from "../modal/PostModal";
import PostLike from "./PostLike";
import PostImage from "./PostImage";
import PostComment from "./PostComment";
import { formatDateTime } from "../../utils";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
/* ====================================================== */

const PostItem = ({ data }) => {
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();
  const { data: userData } = useQuerySnapshot("users", "userId", data?.userId);
  const date = formatDateTime(data?.createdAt);

  return (
    <React.Fragment>
      <article>
        {/* Post infomation */}
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar avatar={userData?.photoURL} size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/${userData?.slug}`}
                  className="text-sm font-semibold"
                >
                  {userData.username}
                </Link>
                <span className="text-lg font-bold">.</span>
                <span className="text-sm text-MidnightSlate dark:text-slate-300">
                  {date}
                </span>
              </div>
              <p className="text-sm text-slate-500">@{userData.slug}</p>
            </div>
          </div>

          {/* Option icon */}
          <span onClick={handleShowModal} className="icon-post-setting">
            <BsThreeDots />
          </span>
        </section>

        {/* Post content */}
        <section className="flex flex-col gap-3 mt-5">
          <p>{data?.content}</p>
          <PostImage images={data?.postImages} />
        </section>

        {/* Post action */}
        <section className="py-3 border-b border-slate-500">
          <div className="flex items-center">
            <div className="flex items-center flex-1 gap-5">
              <PostLike data={data} />
              <PostComment data={data} />
            </div>
            <div className="flex items-center gap-3">
              <PostShare />
              <PostSave data={data} />
            </div>
          </div>
        </section>
      </article>

      <PostModal postData={data} isOpen={showModal} onClose={handleShowModal} />
    </React.Fragment>
  );
};

/* Add PropsTypes */
PostItem.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.object,
    postId: PropTypes.string,
    postImages: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string,
    userId: PropTypes.string,
  }),
};

export default PostItem;

export const PostItemSkeleton = () => {
  return (
    <article>
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-[37px] h-[37px] rounded-full"></Skeleton>
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-[80px] h-[18px] rounded-sm"></Skeleton>
              <Skeleton className="w-[100px] h-[18px] rounded-sm"></Skeleton>
            </div>
            <Skeleton className="w-[50px] h-[14px] mt-1 rounded-sm"></Skeleton>
          </div>
        </div>
        <Skeleton className="w-[25px] h-[25px] rounded-full"></Skeleton>
      </section>

      <section className="flex flex-col gap-3 mt-5">
        <Skeleton className="w-full h-[28px] rounded-sm"></Skeleton>
        <Skeleton className="w-[300px] h-[25px] rounded-sm"></Skeleton>
        <Skeleton className="w-[470px] h-[470px] rounded-md"></Skeleton>
      </section>
    </article>
  );
};
