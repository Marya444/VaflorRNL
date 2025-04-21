import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GenderService from "../../services/GenderService";
import { Genders } from "../../interfaces/Genders";
import ErrorHandler from "../../components/handler/ErrorHandler";
import Spinner from "../../components/Spinner";

interface GenderTableProps {
  refreshGenders: boolean;
}

const GenderTable = ({ refreshGenders }: GenderTableProps) => {
  const [state, setState] = useState({
    loadingGenders: true,
    genders: [] as Genders[],
  });

  const handleLoadGenders = () => {
    GenderService.loadGenders()
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
  }, [refreshGenders]);

  return (
    <>
      <div className="overflow-auto shadow-sm rounded-4 border bg-white">
        <table className="table align-middle mb-0 table-hover">
          <thead className="table-light">
            <tr>
              <th className="text-center">No.</th>
              <th>Gender</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.loadingGenders ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  <Spinner />
                </td>
              </tr>
            ) : state.genders.length > 0 ? (
              state.genders.map((gender, index) => (
                <tr key={gender.gender_id}>
                  <td className="text-center fw-medium">{index + 1}</td>
                  <td className="fw-semibold">{gender.gender}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`gender/edit/${gender.gender_id}`}
                        className="btn btn-sm btn-outline-success rounded-pill px-3"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`gender/delete/${gender.gender_id}`}
                        className="btn btn-sm btn-outline-danger rounded-pill px-3"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-muted">
                  No Genders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GenderTable;
