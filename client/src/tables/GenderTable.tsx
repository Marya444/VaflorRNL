import { useEffect, useState } from "react";
import Genders from "../interfaces/Genders";
import GenderServices from "../services/GenderServices";
import ErrorHandler from "../components/handler/ErrorHandler";

const GenderTable = () => {
  const [state, setState] = useState({
    loadingGenders: true,
    genders: [] as Genders[],
  });

  const handleLoadGenders = () => {
    GenderServices.loadGender()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            genders: res.data.genders,
          }));
        } else {
          console.error(
            "Unexpected status error during loading genders:",
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
          loadingGenders: false,
        }));
      });
  };

  useEffect(() => {
    handleLoadGenders();
  }, []);

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr className="align-middle">
            <th>No.</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.genders.map((gender, index) => (
            <tr className="align-middle">
              <td>{index + 1}</td>
              <td>{gender.gender}</td>
              <td>
                <div className="btn-group">
                  <button type="button" className="btn btn-success">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GenderTable;
