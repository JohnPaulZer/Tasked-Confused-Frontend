import Modal from "../common/Modal";

interface MainPageModalsProps {
  // Delete Modal
  isDeleteModalOpen: boolean;
  onDeleteClose: () => void;
  onDeleteConfirm: () => void;

  // Edit Modal
  isEditModalOpen: boolean;
  onEditClose: () => void;
  onEditConfirm: () => void;

  // Complete Modal
  isCompleteModalOpen: boolean;
  onCompleteClose: () => void;
  onCompleteConfirm: () => void;
}

export default function MainPageModals({
  isDeleteModalOpen,
  onDeleteClose,
  onDeleteConfirm,
  isEditModalOpen,
  onEditClose,
  onEditConfirm,
  isCompleteModalOpen,
  onCompleteClose,
  onCompleteConfirm,
}: MainPageModalsProps) {
  return (
    <>
      {/* --- DELETE MODAL --- */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteClose}
        title="Delete Task"
        footer={
          <>
            <button
              onClick={onDeleteClose}
              className="px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onDeleteConfirm}
              className="px-6 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-lg">Are you sure you want to delete this task?</p>
        <p className="text-sm opacity-70 mt-2">This action cannot be undone.</p>
      </Modal>

      {/* --- EDIT MODAL --- */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={onEditClose}
        title="Edit Task"
        footer={
          <>
            <button
              onClick={onEditClose}
              className="px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onEditConfirm}
              className="px-6 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Edit
            </button>
          </>
        }
      >
        <p className="text-lg">Do you want to edit this task?</p>
      </Modal>

      {/* --- COMPLETE TASK MODAL --- */}
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={onCompleteClose}
        title="Complete Task"
        footer={
          <>
            <button
              onClick={onCompleteClose}
              className="px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onCompleteConfirm}
              className="px-6 py-2 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Yes, Complete
            </button>
          </>
        }
      >
        <p className="text-lg">Mark this task as completed?</p>
        <p className="text-sm opacity-70 mt-2">Good job! Keep it up. 🎉</p>
      </Modal>
    </>
  );
}
