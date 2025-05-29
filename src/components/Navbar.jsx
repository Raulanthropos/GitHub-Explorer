import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-dark text-white position-sticky top-0 w-100">
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
