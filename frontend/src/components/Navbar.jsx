import React from "react";
import {Link } from "react-router-dom";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
  return (
    
<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <div className="container-fluid">
  <Link  className="navbar-brand" to="/">Home</Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
     
        <li className="nav-item">
               <Link className="nav-link" to="/Helpout">Helpout</Link>
        </li>
        <li className="nav-item">
        <a  className="nav-link" href="http://localhost:8080/showall">View All</a>
        </li>
      </ul>
      <Link className="btn btn-outline-success my-2 my-lg-0" to="/Login">Login</Link>
    </div>
  </div>
</nav>
    
  );
}

export default Navbar;