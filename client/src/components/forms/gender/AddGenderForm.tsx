import { ChangeEvent, FormEvent, useState } from "react";
import ErrorHandler from "../../handler/ErrorHandler";
import GenderFieldErrors from "../../../interfaces/GenderFieldErrors";
import SpinnerSmall from "../../SpinnerSmall";
import GenderService from "../../../services/GenderService";

interface AddGenderFormProps {
  onGenderAdded: (message: string) => void;
}

const AddGenderForm = ({ onGenderAdded }: AddGenderFormProps) => {
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
    }));

    GenderService.storeGender(state)

      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            gender: "",
            errors: {} as GenderFieldErrors,
          }));
          onGenderAdded(res.data.message);
        } else {
          console.error(
            "Unexpected status error during storing gender: ",
            res.status
          );
        }
      })

      .catch((error) => {
        if (error.response.status === 422) {
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
          loadingStore: false,
        }));
      });
  };

  return (
    <>
      <form
        onSubmit={handleStoreGender}
        className="bg-white shadow-sm rounded-4 p-4 px-md-5 mt-3 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-4">
          <label htmlFor="gender" className="form-label fw-semibold">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            className={`form-control rounded-3 ${
              state.errors.gender ? "is-invalid" : ""
            }`}
            value={state.gender}
            onChange={handleInputChange}
          />
          {state.errors.gender && (
            <div className="text-danger mt-2 small">
              {state.errors.gender[0]}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary rounded-pill px-4"
            disabled={state.loadingStore}
          >
            {state.loadingStore ? (
              <>
                <SpinnerSmall /> Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddGenderForm;
