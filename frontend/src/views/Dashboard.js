import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './Dashstyle.css';

// import Header from '../components/Header';

function Dashboard() {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    window.debug = {} || window.debug;
    window.debug.toggleNavbar = toggleNavbar;

  return(
    <>
    
<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">ACKERS APP</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="index.html">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://tinyurl.com/4d6nammc">Sign up to help out</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://tinyurl.com/4d6nammc">Sign up to become a volunteer</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<main className="container">
  <div className="bg-light p-5 rounded">
    <h1>Do you need help?</h1>
    <p className="lead">Call this number: 911</p>
  </div>
</main>


    <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

      
    </>
  );
  
}

export default Dashboard;
