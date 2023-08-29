import React from "react";
import { FaRegComment } from "react-icons/fa";
import CommentModal from "../modal/CommentModal";
import useToggle from "../../hooks/useToggle";

const PostComment = () => {
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();

  return (
    <React.Fragment>
      <div className="flex items-center gap-2">
        <span
          onClick={handleShowModal}
          className="text-xl cursor-pointer hover:opacity-70"
        >
          <FaRegComment />
        </span>
        <span>7</span>
      </div>

      <CommentModal isOpen={showModal} onClose={handleShowModal} />
    </React.Fragment>
  );
};

export default PostComment;
