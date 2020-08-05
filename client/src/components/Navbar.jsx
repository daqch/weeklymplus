import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="nav">
      <Link to="/">
        <button className="btn btn-sm btn-dark ">Home</button>
      </Link>
      <Link to="/register">
        <button className="btn btn-sm btn-dark mx-3">Register</button>
      </Link>
      <Link to="/login">
        <button className="btn btn-sm btn-dark">Login</button>
      </Link>
    </div>
  );
}
