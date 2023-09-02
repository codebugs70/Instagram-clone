import React from "react";
import { FaRegComment } from "react-icons/fa";
import CommentModal from "../modal/CommentModal";
import useToggle from "../../hooks/useToggle";
import { useDispatch } from "react-redux";
import { setPostData } from "../../redux/features/postSlice";

const PostComment = ({ data }) => {
  const dispatch = useDispatch();
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();

  const toggleModal = (postData) => {
    handleShowModal();
    dispatch(setPostData(postData));
  };

  return (
    <React.Fragment>
      <div className="flex items-center gap-2">
        <span
          onClick={() => toggleModal(data)}
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
