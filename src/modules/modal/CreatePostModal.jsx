import useUploadImages from "../../hooks/useUploadImages";
import UserAvatar from "../user/UserAvatar";
import useHandleChange from "../../hooks/useHandleChange";
import React, { useState } from "react";
import PropTypes from "prop-types";
import PostUpload from "../post/PostUpload";
import PostDisplayImages from "../post/PostDisplayImages";
import Loading from "../../components/loading/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../../constant";
import { toast } from "react-toastify";
import { IoMdShareAlt } from "react-icons/io";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { db } from "../../utils/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
/* =================================================================== */

const CreatePostModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { images, setImages, loading, handleSelectImage } = useUploadImages();
  const { value, setValue, onChangeVal } = useHandleChange();
  const [isLoading, setIsLoading] = useState(false);

  // Create new post
  const handleCreatePost = async () => {
    if (!currentUser.userId) {
      navigate("/sign-in");
      return;
    }
    setIsLoading(true);

    try {
      const postRef = collection(db, "posts");
      const postDocRef = await addDoc(postRef, {
        userId: currentUser.userId,
        content: value,
        postImages: images,
        createdAt: serverTimestamp(),
      });

      await updateDoc(postDocRef, {
        postId: postDocRef.id,
      });

      setValue("");
      setImages([]);
      setIsLoading(false);
      onClose();

      toast.success("New post added!", toastOptions);
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

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
              <Dialog.Panel className=" w-full max-w-[910px]  transition-all rounded-md shadow-xl ">
                <section className="flex items-center justify-between p-3 text-lg font-semibold bg-white border-b border-slate-600 rounded-tl-md rounded-tr-md dark:bg-SlateGray">
                  <h1 className="text-black dark:text-white">
                    Create new post
                  </h1>

                  {/* Add post */}
                  <div
                    onClick={handleCreatePost}
                    className="flex items-center gap-1 cursor-pointer text-BlueForst hover:text-ElectricBlue"
                  >
                    {isLoading ? (
                      <Loading
                        className="mr-2"
                        borderColor="border-BlueForst"
                        size="w-[20px] h-[20px]"
                        borderSize="border-t-2 border-2"
                      />
                    ) : (
                      <>
                        Post
                        <IoMdShareAlt className="text-2xl" />
                      </>
                    )}
                  </div>
                </section>

                <section className="grid min-h-[567px] grid-cols-[minmax(567px,_auto)_1fr] bg-white dark:bg-SlateGray rounded-bl-md rounded-br-md">
                  <div className="flex items-center justify-center">
                    {loading && <Loading />}

                    {!loading && images.length === 0 && (
                      <PostUpload onChange={handleSelectImage} />
                    )}

                    {!loading && images.length > 0 && (
                      <PostDisplayImages
                        setImages={setImages}
                        onChange={handleSelectImage}
                        images={images}
                      />
                    )}
                  </div>

                  <div className="w-full p-3 border-l border-slate-600">
                    <div className="flex items-center gap-2">
                      <UserAvatar size="sm" avatar={currentUser?.photoURL} />
                      <h1 className="font-medium">{currentUser?.username}</h1>
                    </div>
                    <textarea
                      value={value}
                      onChange={onChangeVal}
                      className="w-full mt-4 p-2 bg-transparent outline-none resize-none min-h-[350px]"
                      placeholder="Enter description...."
                    />
                  </div>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

CreatePostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreatePostModal;
