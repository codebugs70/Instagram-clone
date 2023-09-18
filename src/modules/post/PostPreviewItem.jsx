import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import Skeleton from "../../components/loading/Skeleton";
import { useDispatch } from "react-redux";
import useToggle from "../../hooks/useToggle";
import { setPostData } from "../../redux/features/postSlice";
import CommentModal from "../modal/CommentModal";
import useFetchSubCollection from "../../hooks/useFetchSubCollection";
/* ====================================================== */

const PostPreviewItem = ({ data }) => {
  const dispatch = useDispatch();
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();
  const { data: likeCount } = useFetchSubCollection(
    "posts",
    data?.postId,
    "likes"
  );
  const { data: cmtCount } = useFetchSubCollection(
    "posts",
    data?.postId,
    "comments"
  );

  const toggleModal = (postData) => {
    handleShowModal();
    dispatch(setPostData(postData));
  };

  if (!data) return null;
  return (
    <section>
      <div
        onClick={() => toggleModal(data)}
        className="relative transition-all rounded-md aspect-square group"
      >
        <img
          src={data?.postImages[0]}
          className="rounded-md img-cover"
          alt=""
        />

        {/* overlay */}
        <div className="absolute inset-0 transition-all rounded-md hover:bg-black hover:bg-opacity-50"></div>

        <div className="absolute items-center justify-center hidden gap-10 text-xl md:text-2xl font-medium text-white -translate-x-2/4 -translate-y-2/4 left-[45%] md:left-2/4 top-2/4 md:gap-5 group-hover:flex">
          <div className="flex items-center gap-2 md:gap-3 ">
            <span className="flex-shrink-0">
              <AiFillHeart />
            </span>
            <span>{likeCount.length || 0}</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 ">
            <span className="flex-shrink-0">
              <FaComment />
            </span>
            <span>{cmtCount.length || 0}</span>
          </div>
        </div>
      </div>

      <CommentModal isOpen={showModal} onClose={handleShowModal} />
    </section>
  );
};

export const PostPreviewItemSkeleton = () => {
  return <Skeleton className="rounded-md aspect-square"></Skeleton>;
};

export default PostPreviewItem;
