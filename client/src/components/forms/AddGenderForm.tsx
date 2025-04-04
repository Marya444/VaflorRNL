import { ChangeEvent, FormEvent, useState } from "react";
import GenderServices from "../../services/GenderServices";
import ErrorHandler from "../handler/ErrorHandler";
import GenderFieldErrors from "../../interfaces/GenderFieldErrors";

const AddGenderForm = () => {
  const [state, setState] = useState({
    loadingStore: false,
    gender: "",
    errorMessage: "",
    errors: {} as GenderFieldErrors,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errorMessage: "",
    }));
  };

  const handleStoreGender = (e: FormEvent) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      loadingStore: true,
      errorMessage: "",
    }));

    GenderServices.storeGender({ gender: state.gender })
      .then((res) => {
        if (res.data.status === 200) {
          setState({
            loadingStore: false,
            gender: "",
            errorMessage: "",
            errors: {} as GenderFieldErrors, 
          });
        } else {
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Unexpected status error during storing gender: " + res.data.status,
          }));
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors || {}, 
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingStore: false,
        }));
      });
  };

  return (
    <>
      <form onSubmit={handleStoreGender}>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              className={`form-control ${
                state.errors.gender ? "is-invalid" : ""
              }`}
              id="gender"
              name="gender"
              value={state.gender}
              onChange={handleInputChange}
            />
            {state.errors.gender && (
              <div className="invalid-feedback">{state.errors.gender}</div>
            )}
          </div>
          {state.errorMessage && (
            <p className="text-danger">{state.errorMessage}</p>
          )}
        </div>
        <div className="d-flex justify-content-end">
          {state.loadingStore ? (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AddGenderForm;
