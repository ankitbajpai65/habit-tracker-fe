import React from "react";
import { IoClose } from "react-icons/io5";
import Modal from "./Modal";
import Button from "./Button";

const ConfirmationModal = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  text: string;
  //   subText: string;
  confirmText: string;
  onConfirm: () => void;
  //   isLoading: boolean;
}) => {
  const { isOpen, setIsOpen, title, text, confirmText, onConfirm } = props;

  return (
    <Modal isOpen={isOpen}>
      <div className="w-[450px] p-8 flex-col justify-center gap-4 rounded-lg flex items-center bg-white relative z-50 m-3">
        <IoClose
          size={25}
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-4 font-extrabold cursor-pointer text-bold p-1 hover:bg-medswan-50 rounded-full"
        />
        <h1 className="text-2xl font-semibold mb-1">{title}</h1>
        <div>
          <p className="text-text-secondary text-sm text-justify mb-2">
            {text}
          </p>
          {/* <p className="text-sm text-text-secondary text-justify">{subText}</p> */}
        </div>
        <div className="w-full flex items-center justify-center gap-4 text-xs mt-3">
          <Button
            variant="outlined"
            text="Cancel"
            style="px-3 py-2 rounded-md"
            onClick={() => setIsOpen(false)}
          />
          <Button
            variant="filled"
            text={confirmText}
            style="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
            onClick={onConfirm}
            // icon={isLoading && <LocalLoader status={isLoading} size={4} />}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
