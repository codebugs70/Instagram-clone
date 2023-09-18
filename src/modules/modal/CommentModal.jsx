import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CommentItem, { CommentItemSkeleton } from "../comment/CommentItem";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
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
import { setCmtData, setIsUpdateCmt } from "../../redux/features/postSlice";
import { IoClose } from "react-icons/io5";
/* ====================================================== */

const CommentModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { postData, cmtData, isUpdateCmt } = useSelector((state) => state.post);
  const [isLoading, setIsLoading] = useState(false);
  const { value, setValue, onChangeVal } = useHandleChange();

  const { data: commentList, isLoading: pending } = useFetchSubCollection(
    "posts",
    postData?.postId,
    "comments"
  );

  useEffect(() => {
    if (!cmtData) return;
    setValue(cmtData?.comment);
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
    if (!cmtData) return;
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
      dispatch(setIsUpdateCmt(false));
      dispatch(setCmtData(null));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCmt = async () => {
    if (!value.trim()) return;
    if (!currentUser?.userId) {
      navigate("/sign-in");
      return;
    }
    setIsLoading(true);

    try {
      const cmtRef = collection(db, "posts", postData?.postId, "comments");
      const cmtDocRef = await addDoc(cmtRef, {
        comment: value,
        userId: currentUser?.userId,
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
        <Dialog as="div" className="relative z-[999]" onClose={onClose}>
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

          <div className="fixed inset-0 flex items-center justify-center w-full mx-auto lg:max-w-5xl lg:px-5 xl:px-0 xl:max-w-6xl">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-full transition-all bg-white rounded-md shadow-xl lg:grid lg:grid-cols-2 dark:bg-InkyBlack">
                <PostImage
                  className="object-contain hidden lg:block h-[500px] lg:h-[720px] w-full"
                  images={postData?.postImages}
                ></PostImage>

                {/* Comment */}
                <section className="relative w-full h-screen lg:h-full lg:border-l border-LightGray dark:border-slate-600">
                  <div className="flex items-center justify-between px-5 py-2 lg:hidden">
                    <h1 className="text-xl font-medium md:text-2xl">
                      Other comments
                    </h1>
                    <span
                      onClick={onClose}
                      className="flex items-center justify-center hover:bg-opacity-90 cursor-pointer w-[35px] h-[35px] rounded-full bg-RaspberryRed text-white"
                    >
                      <IoClose size={22} />
                    </span>
                  </div>

                  <ul className="flex flex-col gap-1 overflow-y-auto">
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
                    className="absolute bottom-0 flex items-center justify-center w-full gap-2 border-t dark:border-slate-600 bg-SilverMist border-LightGray dark:bg-Charcoal"
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
