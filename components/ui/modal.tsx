"use client";

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1000] transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white p-6 md:p-12 max-w-2xl w-[95%] md:w-[90%] relative border border-pink-200 shadow-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-black cursor-pointer p-2 hover:text-gray-500 bg-transparent border-0"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        {title && (
          <h2 className="text-left mb-6">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}

