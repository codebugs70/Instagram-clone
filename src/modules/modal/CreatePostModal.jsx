import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import UserAvatar from "../user/UserAvatar";
import { IoMdShareAlt } from "react-icons/io";
import { BiImageAdd } from "react-icons/bi";
/* ====================================================== */

const CreatePostModal = ({ isOpen, onClose }) => {
  return (
    <>
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
                  <div className="flex items-center gap-1 cursor-pointer text-BlueForst hover:text-ElectricBlue">
                    Post
                    <IoMdShareAlt className="text-2xl" />
                  </div>
                </section>

                <section className="grid grid-cols-[minmax(567px,_auto)_1fr] bg-white dark:bg-SlateGray rounded-bl-md rounded-br-md">
                  <div className="w-[567px] h-[567px] flex items-center justify-center">
                    <label
                      htmlFor="choose-image"
                      className="flex flex-col items-center border-MidnightSlate dark:border-white justify-center gap-4 border border-dashed dark:hover:bg-white hover:bg-[#eee] dark:hover:bg-opacity-10 transition-all cursor-pointer rounded-full w-[200px] h-[200px]"
                    >
                      <BiImageAdd className="text-4xl" />
                      <p>Choose Images</p>
                      <input
                        type="file"
                        id="choose-image"
                        className="hidden-input "
                      />
                    </label>
                  </div>
                  {/* <img
                    className="w-[567px] h-[567px] rounded-bl-md"
                    src="https://source.unsplash.com/random"
                    alt="post-image"
                  /> */}

                  <div className="w-full p-3 border-l border-slate-600">
                    <div className="flex items-center gap-2">
                      <UserAvatar
                        size="sm"
                        avatar={"https://source.unsplash.com/random"}
                      />
                      <h1 className="font-medium">Codebugs</h1>
                    </div>
                    <textarea
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
    </>
  );
};

CreatePostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreatePostModal;
