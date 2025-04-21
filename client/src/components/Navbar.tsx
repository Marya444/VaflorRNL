import { Link } from "react-router-dom";
const Navbar = () => {
  const menuItems = [
    {
      route: "/",
      title: "Genders",
    },

    {
      route: "/users",
      title: "Users",
    },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-primary fs-4" href="#">
            RnL Demo
          </a>
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
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-3">
              {menuItems.map((menuItem, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    className="nav-link text-dark fw-medium px-3 py-2 rounded hover-bg-light"
                    to={menuItem.route}
                    style={{ transition: "background-color 0.3s" }}
                  >
                    {menuItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
