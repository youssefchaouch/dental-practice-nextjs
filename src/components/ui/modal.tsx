import { cn } from "@/lib/utils";
import * as React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={cn("bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative", className)}>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
