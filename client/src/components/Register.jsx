import React, { Fragment, useState } from "react";
import Navbar from "./Navbar";
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
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      localStorage.setItem("token", parseRes.token);
      setAuth(true);
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
        <h1>Register</h1>
        <form onSubmit={submit}>
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
    </Fragment>
  );
};

export default Register;
