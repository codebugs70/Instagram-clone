import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CommentItem, { CommentItemSkeleton } from "../comment/CommentItem";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import PostImage from "../post/PostImage";
import useHandleChange from "../../hooks/useHandleChange";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import useFetchSubCollection from "../../hooks/useFetchSubCollection";
import { v4 } from "uuid";
/* ====================================================== */

const CommentModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { postData, cmtData } = useSelector((state) => state.post);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateCmt, setIsUpdateCmt] = useState(false);
  const { value, setValue, onChangeVal } = useHandleChange();

  const { data: commentList, isLoading: pending } = useFetchSubCollection(
    "posts",
    postData?.postId,
    "comments"
  );

  useEffect(() => {
    if (!cmtData) return;
    setValue(cmtData?.comment);
    setIsUpdateCmt(true);
  }, [cmtData, setValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdateCmt) {
      handleUpdateCmt();
    } else {
      handleAddCmt();
    }
  };

  const handleUpdateCmt = async () => {
    if (!cmtData) navigate("/");
    setIsLoading(true);
    try {
      const cmtDocRef = doc(
        db,
        "posts",
        cmtData?.postId,
        "comments",
        cmtData?.cmtId
      );
      await updateDoc(cmtDocRef, {
        comment: value,
      });

      setValue("");
      setIsUpdateCmt(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCmt = async () => {
    if (!value.trim()) return;
    if (!currentUser.userId) {
      navigate("/sign-in");
      return;
    }
    setIsLoading(true);

    try {
      const cmtRef = collection(db, "posts", postData?.postId, "comments");
      const cmtDocRef = await addDoc(cmtRef, {
        comment: value,
        userId: postData?.userId,
        postId: postData?.postId,
        createdAt: serverTimestamp(),
      });

      await updateDoc(cmtDocRef, {
        cmtId: cmtDocRef.id,
      });

      setValue("");
      setIsLoading(false);
    } catch (error) {
      console.log("Error adding new comment: ", error);
    }
  };

  if (!postData) return null;
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

          <div className="fixed inset-0 flex items-center justify-center w-full max-w-6xl mx-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="grid grid-cols-2 transition-all bg-white rounded-md shadow-xl dark:bg-InkyBlack">
                <PostImage
                  className="object-contain h-[720px] w-full"
                  images={postData?.postImages}
                ></PostImage>

                {/* Comment */}
                <section className="relative border-l border-text_3">
                  <ul className="flex flex-col gap-1 max-h-[670px] overflow-x-auto">
                    {pending &&
                      Array(5)
                        .fill(0)
                        .map(() => <CommentItemSkeleton key={v4()} />)}

                    {commentList.length > 0 &&
                      commentList.map((item, index) => (
                        <CommentItem key={index} data={item} />
                      ))}
                  </ul>

                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center absolute bottom-0 w-full justify-center gap-2 bg-[#eee] border-t border-slate-500 dark:bg-Charcoal"
                  >
                    <input
                      value={value}
                      onChange={onChangeVal}
                      className="w-full p-4  text-MidnightSlate dark:text-white h-[50px] bg-transparent resize-none"
                      placeholder="Write your comment..."
                    />
                    <span
                      onClick={handleAddCmt}
                      className="pr-3 text-xl cursor-pointer"
                    >
                      {isLoading ? (
                        <Loading
                          className="mr-2"
                          borderColor="border-BlueForst"
                          size="w-[20px] h-[20px]"
                          borderSize="border-t-2 border-2"
                        />
                      ) : (
                        <AiOutlineSend />
                      )}
                    </span>
                  </form>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

CommentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentModal;
