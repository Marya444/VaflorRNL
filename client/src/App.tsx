import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Genders from "./pages/gender/Genders";
import DeleteGender from "./pages/gender/DeleteGender";
import EditGender from "./pages/gender/EditGender";
import Users from "./pages/user/Users";
import LogIn from "./pages/login/LogIn";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },

  {
    path: "/genders",
    element: (
      <ProtectedRoute>
      <Genders />
      </ProtectedRoute>
    ),
  },

  {
    path: "/gender/edit/:gender_id",
    element: (
      <ProtectedRoute>
      <EditGender />
      </ProtectedRoute>
    ),
  },

  {
    path: "/gender/delete/:gender_id",
    element: (
      <ProtectedRoute>
      <DeleteGender />
      </ProtectedRoute>
    ),
  },

  {
    path: "/users",
    element: (
      <ProtectedRoute>
      <Users />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
