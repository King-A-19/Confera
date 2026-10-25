//Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("confera-token");

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("confera-user") || "null"
    );
  } catch {
    user = null;
  }

  const displayName =
    user?.name?.trim() ||
    user?.email?.split("@")[0] ||
    "there";

  function handleLogout() {
    localStorage.removeItem("confera-token");
    localStorage.removeItem("confera-user");

    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo">C</span>
          <span className="navbar__name">Confera</span>
        </Link>

        <nav className="navbar__links">
          <Link to="/planner">Planner</Link>
          <Link to="/my-events">My Events</Link>
          <Link to="/#features">Features</Link>
        </nav>

        {token ? (
          <div className="navbar__user">
            <span className="navbar__welcome">
              Hi, <strong title={displayName}>{displayName}</strong>
            </span>

            <button
              type="button"
              className="navbar__logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar__auth">
            <Link to="/login" className="navbar__login">
              Sign In
            </Link>

            <Link to="/planner" className="navbar__cta">
              Start Planning
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
