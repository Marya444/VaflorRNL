import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import ErrorHandler from "../../components/handler/ErrorHandler";
import Spinner from "../../components/Spinner";
import { Users } from "../../interfaces/Users";

interface UsersTable {
  refreshUsers: boolean;
  onEditUser: (user: Users) => void;
}

const UsersTable = ({ refreshUsers, onEditUser }: UsersTable) => {
  const [state, setState] = useState({
    loadingUsers: true,
    users: [] as Users[],
  });

  const handleLoadUsers = () => {
    UserService.loadUsers()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            users: res.data.users,
          }));
        } else {
          console.error(
            "Unexpected status error while loading users: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingUsers: false,
        }));
      });
  };

  const handleUsersFullName = (user: Users) => {
    let fullName = "";

    if (user.middle_name) {
      fullName = `${user.last_name},  ${
        user.first_name
      }, ${user.middle_name.charAt(0)}.`;
    } else {
      fullName = `${user.last_name}, ${user.first_name}`;
    }

    if (user.suffix_name) {
      fullName += ` ${user.suffix_name}`;
    }

    return fullName;
  };

  useEffect(() => {
    handleLoadUsers();
  }, [refreshUsers]);

  return (
    <>
      <div className="card shadow-sm border-0 rounded-4 mt-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle text-nowrap">
              <thead className="table-light">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Birthdate</th>
                  <th scope="col">Address</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {state.loadingUsers ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      <Spinner />
                    </td>
                  </tr>
                ) : state.users.length > 0 ? (
                  state.users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{handleUsersFullName(user)}</td>
                      <td>{user.gender.gender}</td>
                      <td>{user.birth_date}</td>
                      <td>{user.address}</td>
                      <td>{user.contact_number}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-success btn-sm rounded-pill px-3"
                            onClick={() => onEditUser(user)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
