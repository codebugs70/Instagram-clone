import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useLikePost from "../../hooks/useLikePost";
/* ====================================================== */

const PostLike = ({ data }) => {
  const { isLiked, likeCount, handleLikePost } = useLikePost(data?.postId);

  if (!data) return null;
  return (
    <div className="flex items-center gap-2">
      <span
        onClick={handleLikePost}
        className="text-2xl cursor-pointer hover:opacity-70"
      >
        {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
      </span>
      <span>{likeCount.length || 0}</span>
    </div>
  );
};

export default PostLike;
