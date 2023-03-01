import { Link } from "react-router-dom";
import { handleLogin, handleLogout, isLogged } from "../helpers";

export const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img
            src="https://www.carvuk.com/carvuk-logo.svg"
            width="112"
            height="28"
          />
        </a>

        <a
          href="/#"
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="/" className="navbar-item">
            Home
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {isLogged() ? (
                <button onClick={handleLogout} className="button is-light">
                  <strong>Logout</strong>
                </button>
              ) : (
                <>
                  <a href="/login" className="button is-primary">
                    <strong>Login</strong>
                  </a>
                  <a href="/signup" className="button is-light">
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
