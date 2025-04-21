import { useState } from "react";
import AddUserModal from "../../components/modals/user/AddUserModal";
import MainLayout from "../gender/layout/MainLayout";
import UsersTable from "../../tables/user/UsersTable";
import EditUserModal from "../../components/modals/user/EditUserModal";
import type { Users } from "../../interfaces/Users";

const Users = () => {
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);

  const handleOpenEditUserModal = (user: Users) => {
    setSelectedUser(user);
    setOpenEditUserModal(true);
  };

  const handleCloseEditUserModal = () => {
    setSelectedUser(null);
    setOpenEditUserModal(false);
  };
  const content = (
    <>
      <AddUserModal
        showModal={openAddUserModal}
        onRefreshUsers={() => setRefreshUsers(!refreshUsers)}
        onClose={() => setOpenAddUserModal(false)}
      />
      <EditUserModal
        showModal={openEditUserModal}
        user={selectedUser}
        onClose={handleCloseEditUserModal}
        onRefreshUsers={() => setRefreshUsers(!refreshUsers)}
      />
      <div className="d-flex justify-content-end mt-4 mb-2">
        <button
          type="button"
          className="btn btn-outline-primary rounded-pill px-4 py-2 shadow-sm"
          onClick={() => setOpenAddUserModal(true)}
        >
          + Add User
        </button>
      </div>

      <UsersTable
        refreshUsers={refreshUsers}
        onEditUser={handleOpenEditUserModal}
      />
    </>
  );

  return <MainLayout content={content} />;
};

export default Users;
