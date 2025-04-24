import { Link, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import GenderService from "../../../services/GenderService";
import ErrorHandler from "../../handler/ErrorHandler";
import Spinner from "../../Spinner";
import GenderFieldErrors from "../../../interfaces/GenderFieldErrors";
import SpinnerSmall from "../../SpinnerSmall";

interface EditGenderFormProps {
  onGenderUpdate: (message: string) => void;
}

const EditGenderForm = ({ onGenderUpdate }: EditGenderFormProps) => {
  const { gender_id } = useParams();

  const [state, setState] = useState({
    loadingGet: true,
    loadingUpdate: false,
    gender_id: 0,
    gender: "",
    errors: {} as GenderFieldErrors,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGetGender = (genderId: number) => {
    setState((prevState) => ({
      ...prevState,
      loadingGet: true,
    }));

    GenderService.getGender(genderId)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            gender_id: res.data.gender.gender_id,
            gender: res.data.gender.gender,
          }));
        } else {
          console.error(
            "Unexpected status error while getting gender: ",
            res.status,
          );
        }
      })

      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingGet: false,
        }));
      });
  };

  const handleUpdateGender = (e: FormEvent) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      loadingUpdate: true,
    }));

    GenderService.updateGender(state.gender_id, state)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            errors: {} as GenderFieldErrors,
          }));

          onGenderUpdate(res.data.message);
        } else {
          console.error(
            "Unexpected status error while updating gender: ",
            res.status,
          );
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          console.log(error.response);
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingUpdate: false,
        }));
      });
  };

  useEffect(() => {
    if (gender_id) {
      const parsedGenderId = parseInt(gender_id);
      handleGetGender(parsedGenderId);
    } else {
      console.error("Invalid gender_id: ", gender_id);
    }
  }, [gender_id]);

  return (
    <>
      {state.loadingGet ? (
        <div className="text-center mt-5">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleUpdateGender}>
          <div
            className="bg-white shadow-sm rounded-4 p-4 px-md-5 w-100"
            style={{ maxWidth: "600px" }}
          >
            <div className="mb-4">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.gender ? "is-invalid" : ""
                }`}
                name="gender"
                id="gender"
                value={state.gender}
                onChange={handleInputChange}
                placeholder="Enter gender"
              />
              {state.errors.gender && (
                <p className="text-danger mt-2">{state.errors.gender[0]}</p>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/" className="btn btn-outline-secondary">
                Back
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={state.loadingUpdate}
              >
                {state.loadingUpdate ? (
                  <>
                    <SpinnerSmall /> Updating...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default EditGenderForm;
