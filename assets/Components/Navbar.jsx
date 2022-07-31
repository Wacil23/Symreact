import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import authAPI from "../Services/authAPI";
import AuthContext from "../Contexts/AuthContext";

const Navbar = ({ history }) => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuth(false);
    history.push('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">SymReact</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">Clients</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/invoices">Factures</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto d-flex align-items-center">
            {(!isAuth && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">inscription</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-success">
                    Connexion !
                  </NavLink>
                </li>
              </>)) || (
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger">Deconnexion
                  </button>
                </li>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;;