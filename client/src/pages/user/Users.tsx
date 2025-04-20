import { useState } from "react";
import AddUserModal from "../../components/modals/user/AddUserModal";
import MainLayout from "../gender/layout/MainLayout";
import UsersTable from "../../tables/user/UsersTable";

const Users = () => {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const content = (
    <>
      <AddUserModal
        showModal={openAddUserModal}
        onClose={() => setOpenAddUserModal(false)}
      />
      <div className="d-flex justify-content-end mt-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setOpenAddUserModal(true)}
        >
          Add User
        </button>
      </div>
      <UsersTable />
    </>
  );

  return <MainLayout content={content} />;
};

export default Users;
