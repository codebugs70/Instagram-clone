import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { toastOptions } from "../../constant";
import Loading from "../../components/loading/Loading";
import { setPostData } from "../../redux/features/postSlice";
import UpdatePostModal from "./UpdatePostModal";
import useToggle from "../../hooks/useToggle";
/* ====================================================== */

const PostModal = ({ isOpen, onClose, postData }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { toggle: showModal, handleToggle: handleShowModal } = useToggle();
  const [isLoading, setIsLoading] = useState(false);
  if (!postData) return null;

  // Delete post
  const handleDeletePost = async (postId) => {
    if (!postId) return;
    setIsLoading(true);

    try {
      const postDocRef = doc(db, "posts", postId);
      await deleteDoc(postDocRef);

      setIsLoading(false);
      onClose();
      toast.success("Post deleted!", toastOptions);
    } catch (error) {
      console.log("Error deleting post: ", error);
    }
  };

  // Toggle update modal
  const toggleUpdate = (data) => {
    if (!data) return;
    handleShowModal();
    dispatch(setPostData(data));
    onClose();
  };

  // Post options
  const postOptions = [
    { title: "Go to post", onClick: () => {} },
    ...(currentUser?.userId === postData?.userId
      ? [
          { title: "Update", onClick: () => toggleUpdate(postData) },
          {
            title: "Delete",
            onClick: () => handleDeletePost(postData?.postId),
          },
        ]
      : []),
    {
      title: "Report",
      onClick: () => {
        toast.error("Nothing happened!", toastOptions);
      },
      color: "text-RaspberryRed",
    },
    { title: "Cancel", onClick: onClose },
  ];

  return (
    <section>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl dark:bg-SlateGray">
                  <ul className="flex flex-col items-center justify-center mx-auto">
                    {postOptions.map((item) => {
                      return (
                        <li
                          onClick={item.onClick}
                          className={`${
                            item.color ||
                            "text-MidnightSlate dark:text-slate-200"
                          } w-full py-5 font-medium text-center cursor-pointer hover:bg-[#eee]  dark:hover:bg-white dark:hover:bg-opacity-5`}
                          key={item.title}
                        >
                          {isLoading ? (
                            <Loading
                              borderSize="border-2 border-t-2"
                              size="w-[20px] h-[20px]"
                            />
                          ) : (
                            item.title
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <UpdatePostModal isOpen={showModal} onClose={handleShowModal} />
    </section>
  );
};

PostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  postData: PropTypes.shape({
    createdAt: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    postImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }),
};

export default PostModal;
