import React from "react";
import Modal from "../common/Modal";

interface AddTaskModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: "alert" | "confirm";
  onClose: () => void;
  onConfirm?: () => void;
  noLabel?: string;
  yesLabel?: string;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  title,
  message,
  type,
  onClose,
  onConfirm,
  noLabel = "No, Stay",
  yesLabel = "Yes, Leave",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        type === "confirm" ? (
          <>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10"
            >
              {noLabel}
            </button>
            <button
              onClick={() => {
                if (onConfirm) onConfirm();
              }}
              className="px-6 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 shadow-md hover:shadow-lg"
            >
              {yesLabel}
            </button>
          </>
        ) : (
          <div className="flex justify-center w-full">
            <button
              onClick={() => {
                onClose();
                if (onConfirm) onConfirm();
              }}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 shadow-md hover:shadow-lg"
            >
              Okay
            </button>
          </div>
        )
      }
    >
      <p className="text-lg">{message}</p>
    </Modal>
  );
};

export default AddTaskModal;
