import useUploadImages from "../../hooks/useUploadImages";
import slugify from "slugify";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostUpload from "../post/PostUpload";
import Loading from "../../components/loading/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../../constant";
import { toast } from "react-toastify";
import { IoMdShareAlt } from "react-icons/io";
import { Fragment } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Dialog, Transition } from "@headlessui/react";
import { db } from "../../utils/firebase";
import { BiImageAdd } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserValidation } from "../../utils/valdition";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";
/* =================================================================== */

const UpdateUserModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(UserValidation),
    defaultValues: {
      username: "",
      slug: "",
    },
  });
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const { images, setImages, loading, handleSelectImage } = useUploadImages();

  /* Reset data */
  useEffect(() => {
    async function fetchUser() {
      if (!currentUser?.userId) return;
      const userDocRef = doc(db, "users", currentUser?.userId);
      const userDocSnapshot = await getDoc(userDocRef);
      const data = userDocSnapshot.data();
      if (data) {
        reset({
          username: data.username,
          slug: data.slug,
        });
      }
      setImages("");
    }
    fetchUser();
  }, [currentUser.photoURL, currentUser?.userId, reset, setImages]);

  // Update user
  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    if (!currentUser.userId) {
      navigate("/sign-in");
      return;
    }
    setIsLoading(true);

    try {
      const userDocRef = doc(db, "users", currentUser?.userId);
      const photo = images && images[0];
      await updateDoc(userDocRef, {
        slug: slugify(values.slug, { lower: true }),
        photoURL: photo,
        ...values,
      });

      setIsLoading(false);
      navigate("/");
      onClose();
      toast.success("User updated!", toastOptions);
    } catch (error) {
      console.log("Error updating user: ", error);
    }
  };

  return (
    <section>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-lg transition-all rounded-md shadow-xl ">
                <form
                  onSubmit={handleSubmit(handleUpdateUser)}
                  className="p-3 font-medium rounded-md bg-SilverMist dark:bg-SlateGray"
                >
                  <section className="flex items-center justify-between">
                    <h1 className="text-black dark:text-white">
                      Update infomation
                    </h1>

                    {/* Update post */}
                    <button
                      type="submit"
                      className="flex items-center gap-1 cursor-pointer text-BlueForst hover:text-ElectricBlue"
                    >
                      {isLoading ? (
                        <Loading
                          className="mr-2"
                          size="w-[20px] h-[20px]"
                          borderSize="border-t-2 border-2"
                        />
                      ) : (
                        <>
                          Update
                          <IoMdShareAlt className="text-2xl" />
                        </>
                      )}
                    </button>
                  </section>

                  <section className="pt-5">
                    <div className="flex items-center justify-center min-h-[200px]">
                      {loading && (
                        <Loading
                          size="w-[30px] h-[30px]"
                          borderSize="border-2 border-t-2"
                        />
                      )}

                      {!loading && !images && (
                        <div className="w-[200px] h-[200px] flex items-center justify-center dark:border-white border-MidnightSlate  border border-dashed rounded-full">
                          <div className="">
                            <label
                              htmlFor="choose-image"
                              className="icon-image text-[22px]"
                            >
                              <BiImageAdd />
                              <input
                                onChange={handleSelectImage}
                                type="file"
                                id="choose-image"
                                className="hidden-input "
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      {!loading && images && (
                        <div className="w-[200px] h-[200px] relative">
                          <img
                            src={images}
                            className="rounded-full img-cover"
                            alt="user-avatar"
                          />
                          <div className="absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
                            <div className="flex items-center gap-4">
                              <label
                                htmlFor="choose-image"
                                className="icon-image text-[22px]"
                              >
                                <BiImageAdd />
                                <input
                                  onChange={handleSelectImage}
                                  type="file"
                                  id="choose-image"
                                  className="hidden-input "
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-4 p-5">
                      <Input
                        type="username"
                        name="username"
                        error={errors.username}
                        register={register}
                        placeholder="Enter your username..."
                      />
                      <Input
                        type="slug"
                        name="slug"
                        error={errors.slug}
                        register={register}
                        placeholder="Enter your slug..."
                      />
                    </div>
                  </section>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

UpdateUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateUserModal;
