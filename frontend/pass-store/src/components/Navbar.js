import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/signin");
  };

  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand text-dark" href="/">
          <b>Pass Store</b>
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/site-details/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/same-password">
              SamePasswords
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/profile">
              Profile
              </a>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button
                    className="border-0 bg-light nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/signin/">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
