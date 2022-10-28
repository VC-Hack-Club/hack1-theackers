import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="alert alert-danger mb-20" role="alert">
    <h4 className="alert-heading mb-2">Do you need immediate help?</h4>
    <p>
    If the situation is potentially life-threatening, get immediate emergency assistance by calling <a href="tel://911">911</a>, available 24 hours a day.
    </p>
    <p>
    If you or someone you know is suicidal or in emotional distress, contact the <a href="https://988lifeline.org/">https://988lifeline.org/</a>
    </p>
    </div>
      <Outlet />
    </>
  );
};

export default Layout;