import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header
      className="bg-dark text-white w-100 shadow-sm"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 1000,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <nav className="py-2">
        <ul className="nav nav-pills justify-content-center mb-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/repos" className="nav-link text-white">
              Repositories
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/followers" className="nav-link text-white">
              Followers
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
