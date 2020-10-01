import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const submit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        toast.error("Could not retrieve character", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Navbar></Navbar>
      <div className="App-header">
        <h1>Login</h1>
        <div className="card">
          <form className="container" onSubmit={submit}>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="form-control my-3"
              onChange={(e) => onChange(e)}
              value={email}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="form-control my-3"
              onChange={(e) => onChange(e)}
              value={password}
            />
            <button className="btn btn-dark btn-block">Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
