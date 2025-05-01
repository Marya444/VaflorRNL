import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FormEvent, useState } from "react";
import SpinnerSmall from "./SpinnerSmall";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [loadingLogout, setLoadingLogout] = useState(false);

  const menuItems = [
    { route: "/genders", title: "Genders" },
    { route: "/users", title: "Users" },
  ];

  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    setLoadingLogout(true);

    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error, null);
      })
      .finally(() => {
        setLoadingLogout(false);
      });
  };

  const handleUserFullName = () => {
    if (!user) return "Guest"; 

    let fullName = `${user.last_name}, ${user.first_name}`;
    if (user.middle_name) {
      fullName += ` ${user.middle_name.charAt(0)}.`;
    }
    if (user.suffix_name) {
      fullName += ` ${user.suffix_name}`;
    }

    return fullName;
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container-fluid px-4">
        <span className="navbar-brand fw-bold text-primary fs-4">RnL Demo</span>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-2">
            {menuItems.map((menuItem, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className="nav-link text-dark fw-medium px-3 py-2 rounded-3"
                  to={menuItem.route}
                  style={{ transition: "background-color 0.3s" }}
                >
                  {menuItem.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {handleUserFullName() && (
              <span className="fw-medium text-muted small text-end">
                {handleUserFullName()}
              </span>
            )}
            <button
              type="button"
              className="btn btn-outline-danger rounded-3 shadow-sm px-3"
              disabled={loadingLogout}
              onClick={handleLogout}
            >
              {loadingLogout ? (
                <>
                  <SpinnerSmall /> Logging Out...
                </>
              ) : (
                "Log Out"
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
