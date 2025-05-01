// import { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import AddUserForm from "../user/AddUserForm";

// const SignUpPage = () => {
//   const [loading, setLoading] = useState(false);
//   const setSubmitForm = useRef(null); // Ref for form submission

//   const onUserAdded = (message) => {
//     // Handle successful user addition (you can show a success message or redirect)
//     alert(message);
//     window.location.href = "/login"; // Redirect to login after successful signup
//   };

//   return (
//     <div>
//       <h2>Create a New Account</h2>
//       <AddUserForm
//         setSubmitForm={setSubmitForm}
//         setLoadingStore={setLoading}
//         onUserAdded={onUserAdded}
//       />
//       <p>
//         Already have an account? <Link to="/login">Log in here</Link>
//       </p>
//     </div>
//   );
// };

// export default SignUpPage;
