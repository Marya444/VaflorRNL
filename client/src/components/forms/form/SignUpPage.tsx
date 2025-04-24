import { useRef, useState } from "react";
import AddUserForm from "../user/AddUserForm";
import AlertMessage from "../../AlertMessage";

const SignUpPage = () => {
  const submitForm = useRef<(() => void) | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = () => {
    if (submitForm.current) {
      submitForm.current();
    }
  };

  const handleUserAdded = (message: string) => {
    setSuccessMessage(message);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Sign Up</h2>

      {successMessage && (
        <AlertMessage variant="success">{successMessage}</AlertMessage>
      )}

      <AddUserForm
        setSubmitForm={submitForm}
        setLoadingStore={setLoading}
        onUserAdded={handleUserAdded}
      />

      <div className="mt-3">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
