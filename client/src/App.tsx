import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Genders from "./pages/gender/Genders";
import DeleteGender from "./pages/gender/DeleteGender";
import EditGender from "./pages/gender/EditGender";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Genders />,
  },

  {
    path: "/gender/edit/:gender_id",
    element: <EditGender />,
  },

  {
    path: "/gender/delete/:gender_id",
    element: <DeleteGender />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
