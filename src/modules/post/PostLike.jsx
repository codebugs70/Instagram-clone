import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const PostLike = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl cursor-pointer hover:opacity-70">
        <AiOutlineHeart />
      </span>
      <span>18</span>
    </div>
  );
};

export default PostLike;
