import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { ChangeEvent, FormEvent, useState } from "react";
import { LogInFieldErrors } from "../../../interfaces/LogInFieldErrors";
import ErrorHandler from "../../handler/ErrorHandler";
import SpinnerSmall from "../../SpinnerSmall";
import AlertMessage from "../../AlertMessage";

const LogInForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loadingLogin: false,
    email: "",
    password: "",
    errors: {} as LogInFieldErrors,
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      loadingLogin: true,
    }));

    login(state.email, state.password)
      .then(() => {
        navigate("/genders");
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else if (error.response.status === 401) {
          handleShowAlertMessage(error.response.data.message, false, true);
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingLogin: false,
        }));
      });
  };

  const handleShowAlertMessage = (
    message: string,
    isSuccess: boolean,
    isVisible: boolean
  ) => {
    setMessage(message);
    setIsSuccess(isSuccess);
    setIsVisible(isVisible);
  };

  const handleCloseAlertMessage = () => {};

  return (
    <>
      <AlertMessage
        message={message}
        isSuccess={isSuccess}
        isVisible={isVisible}
        onClose={handleCloseAlertMessage}
      />
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="card shadow rounded-4 p-4"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h4 className="mb-4 text-center fw-semibold">Hello</h4>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${
                  state.errors.email ? "is-invalid" : ""
                } form-control-lg`}
                id="email"
                name="email"
                value={state.email}
                placeholder="Enter your email"
                onChange={handleInputChange}
                autoFocus
              />

              {state.errors.email && (
                <span className="text-danger">{state.errors.email}</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  state.errors.password ? "is-invalid" : ""
                } form-control-lg`}
                id="password"
                name="password"
                value={state.password}
                placeholder="Enter your password"
                onChange={handleInputChange}
              />

              {state.errors.password && (
                <span className="text-danger">{state.errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 rounded-3"
              disabled={state.loadingLogin}
            >
              {state.loadingLogin ? (
                <>
                  <SpinnerSmall /> Logging in...{" "}
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogInForm;
