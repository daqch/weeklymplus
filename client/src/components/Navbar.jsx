import React from "react";
export default function Navbar(props) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ minHeight: "5vh" }}
    >
      <a className="navbar-brand" href="/">
        WeeklyMplus
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        {!props.online ? (
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/register">
              Register <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link active" href="/Login">
              Login <span className="sr-only">(current)</span>
            </a>
          </div>
        ) : (
          <div className="navbar-nav">
            <a
              className="nav-item nav-link active"
              href="/"
              onClick={(e) => props.logout(e)}
            >
              Logout <span className="sr-only">(current)</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
