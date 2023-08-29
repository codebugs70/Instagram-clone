import React from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import PostLike from "./PostLike";
import PostComment from "./PostComment";
import PostShare from "./PostShare";
import PostSave from "./PostSave";
import PostContent from "./PostContent";
import PostImage from "./PostImage";
import UserAvatar from "../user/UserAvatar";
import useToggle from "../../hooks/useToggle";
import PostModal from "../modal/PostModal";
/* ====================================================== */

const PostItem = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();

  return (
    <React.Fragment>
      <article>
        {/* Post infomation */}
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar avatar={currentUser?.photoURL} size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">
                  {currentUser.username}
                </h4>
                <span className="text-lg font-bold">.</span>
                <span className="text-sm text-MidnightSlate dark:text-slate-300">
                  1 day ago
                </span>
              </div>
              <p className="text-sm text-slate-500">@{currentUser.slug}</p>
            </div>
          </div>

          <span
            onClick={handleShowModal}
            className="text-lg flex items-center justify-center w-[35px] h-[35px] hover:bg-[#ccc] dark:hover:bg-SlateGray rounded-full cursor-pointer"
          >
            <BsThreeDots />
          </span>
        </section>

        {/* Post content */}
        <section className="flex flex-col gap-3 mt-5">
          <PostContent />
          <PostImage />
        </section>

        {/* Post action */}
        <section className="py-3 border-b border-slate-500">
          <div className="flex items-center">
            <div className="flex items-center flex-1 gap-5">
              <PostLike />
              <PostComment />
              <PostShare />
            </div>
            <PostSave />
          </div>
        </section>
      </article>

      <PostModal isOpen={showModal} onClose={handleShowModal} />
    </React.Fragment>
  );
};

export default PostItem;
