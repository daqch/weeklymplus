import React, { Fragment, useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    email: "",
  });

  const { name, email, password } = inputs;

  const submit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, name };
      const response = await fetch(
        "https://friendly-whistler-38809.herokuapp.com/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        toast.error("Account already exists", {
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
      toast.error("Account already exists", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Navbar></Navbar>
      <div className="App-header">
        <h1>Register</h1>
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
            <input
              type="text"
              name="name"
              placeholder="name"
              className="form-control my-3"
              onChange={(e) => onChange(e)}
              value={name}
            />
            <button className="btn btn-dark btn-block">Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
