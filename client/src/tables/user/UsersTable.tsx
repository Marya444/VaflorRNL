import { useEffect, useState } from "react";
import MainLayout from "../../pages/gender/layout/MainLayout";
import Users from "../../interfaces/Users";
import UserService from "../../services/UserService";
import ErrorHandler from "../../components/handler/ErrorHandler";
import Spinner from "../../components/Spinner";

const UsersTable = () => {
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
          console.log(
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
        fullName = `${user.last_name}, ${user.first_name} ${user.middle_name.charAt(0)}.`
    } else {
        fullName = `${user.last_name}, ${user.first_name}`
    }

    if (user.suffix_name) {
        fullName += `${user.suffix_name}`
  }

  return fullName;

}

  useEffect (() => {
    handleLoadUsers();
  }, [])

  const content = (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Birthdate</th>
            <th>Address</th>
            <th>Contact No.</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {state.loadingUsers ? (
            <tr className="align-middle">
              <td colSpan={7} className="text-center">
                <Spinner />
              </td>
            </tr>
          ) : state.users.length > 0 ? (
            state.users.map((user, index) => (
              <tr className="align-middle" key={index}>
                <td>{index + 1}</td>
                <td>{handleUsersFullName(user)}</td>
                <td>{user.gender.gender}</td>
                <td>{user.birth_date}</td>
                <td>{user.address}</td>
                <td>{user.contact_number}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr className="align-middle">
              <td colSpan={7} className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );

  return <MainLayout content={content} />;
};

export default UsersTable;
