import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { AiOutlineSend } from "react-icons/ai";
import CommentItem from "../comment/CommentItem";
/* ====================================================== */

const CommentModal = ({ isOpen, onClose }) => {
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
              <Dialog.Panel className="grid grid-cols-2 transition-all bg-white rounded-md shadow-xl dark:bg-InkyBlack">
                {/* the image */}
                <img
                  className="w-full h-[720px] object-cover rounded-sm"
                  src="https://source.unsplash.com/random"
                  alt="post-image"
                />

                {/* Comment */}
                <div className="">
                  <ul className="flex flex-col gap-5 p-3  max-h-[670px] overflow-x-auto">
                    {Array(13)
                      .fill(0)
                      .map((item, index) => (
                        <CommentItem key={index} />
                      ))}
                  </ul>

                  <div className="flex items-center justify-center gap-2 bg-[#eee] border-t border-slate-500 dark:bg-SlateGray">
                    <textarea
                      className="w-full p-4 text-MidnightSlate dark:text-white h-[50px] bg-transparent resize-none"
                      placeholder="Write your comment..."
                    />
                    <span className="pr-3 text-xl cursor-pointer">
                      <AiOutlineSend />
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

CommentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentModal;
