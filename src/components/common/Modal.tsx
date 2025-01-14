import { Dispatch, ReactNode } from "react";
// import { cn } from "../lib/utils";

export default function Modal({
  children,
  isOpen,
  setIsOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen?: Dispatch<boolean>;
}) {
  return (
    <div
      onClick={() => setIsOpen!(false)}
      className={`backdrop h-full w-full bg-gray-950/35 flex items-center justify-center fixed top-0 left-0 z-50
        ${isOpen ? "visible" : "hidden"}
      `}
    >
      {children}
    </div>
  );
}
