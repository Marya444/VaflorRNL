import { useEffect } from "react";
import UserService from "../../../services/UserService";

const TemporaryCreateUser = () => {
  useEffect(() => {
    const newUser = {
      first_name: "Juan",
      middle_name: "Dela",
      last_name: "Cruz",
      suffix_name: "",
      birth_date: "1990-01-01",
      gender: "1",
      address: "123 Main Street",
      contact_number: "09123456789",
      email: "juan.delacruz@example.com",
      password: "password123",
      password_confirmation: "password123",
    };

    UserService.storeUser(newUser)
      .then((res) => {
        if (res.status === 200) {
          console.log("User created successfully:", res.data.message);
        } else {
          console.error("Unexpected status:", res.status);
        }
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          console.error("Validation errors:", error.response.data.errors);
        } else {
          console.error("Unhandled error:", error);
        }
      });
  }, []);

  return null; // this component doesn't render anything
};

export default TemporaryCreateUser;
