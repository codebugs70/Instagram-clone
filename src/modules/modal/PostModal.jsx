import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
/* ====================================================== */

const PostModal = ({ isOpen, onClose }) => {
  const postOptions = [
    { title: "Got to post", onClick: () => {} },
    { title: "Update", onClick: () => {} },
    { title: "Delete", onClick: () => {} },
    {
      title: "Report",
      onClick: () => {
        toast.error("Nothing happened!", {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
          pauseOnHover: false,
        });
      },
      color: "text-RaspberryRed",
    },
    { title: "Cancel", onClick: onClose },
  ];

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
                          {item.title}
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
    </>
  );
};

PostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PostModal;
