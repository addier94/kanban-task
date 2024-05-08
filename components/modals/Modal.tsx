"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconCross } from "../common/icon/IconCross";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  customDialog?: string;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  customDialog,
}) => {
  const dialogClasses = customDialog
    ? customDialog
    : `
        p-8
        text-left 
        shadow-xl 
        transition-all
        w-full
        sm:my-8 
        sm:w-full 
        sm:max-w-[480px]
        sm:p-10
      `;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
              fixed 
              inset-0 
            bg-black/55
              bg-opacity-75 
              transition-opacity
            "
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="
              flex 
              min-h-full 
              items-center 
              justify-center 
              p-4 
              text-center 
              sm:p-0
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`
                  relative 
                  transform 
                  overflow-hidden 
                  rounded-lg 
                  bg-primary-white
                  dark:bg-primary-dark-grey
                  ${dialogClasses}
                `}
              >
                <div
                  className="
                    absolute 
                    right-0 
                    top-0 
                    hidden 
                    pr-4 
                    pt-4 
                    sm:block
                    z-10
                  "
                >
                  <button
                    type="button"
                    className="
                      rounded-md 
                      focus:outline-none 
                    "
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <IconCross
                      viewBox="0 0 16 16"
                      width={16}
                      height={16}
                      className="
                      cursor-pointer
                      dark:text-primary-medium-grey
                    "
                    />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
