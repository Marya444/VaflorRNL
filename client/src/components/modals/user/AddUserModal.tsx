import AddUserForm from "../../forms/user/AddUserForm";

interface AddUserModalProps {
  showModal: boolean;
  onClose: () => void;
}

const AddUserModal = ({ showModal, onClose }: AddUserModalProps) => {
  return (
    <>
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Add User</h1>
            </div>
            <div className="modal-body">
              <AddUserForm />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save User
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserModal;
