import React from "react";
import { FiBookmark } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import useSavePost from "../../hooks/useSavePost";

const PostSave = ({ data }) => {
  const { isSaved, handleSavePost } = useSavePost(data?.postId);

  return (
    <span onClick={handleSavePost} className="cursor-pointer hover:opacity-70">
      {isSaved ? (
        <FaBookmark className="text-xl md:text-2xl text-BlueForst" />
      ) : (
        <FiBookmark className="text-2xl" />
      )}
    </span>
  );
};

export default PostSave;
