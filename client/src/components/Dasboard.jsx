import React, { Fragment, useState } from "react";

const Dashboard = ({ setAuth }) => {
  const [inputs, setInputs] = useState({ name: "", realm: "" });
  const [characters, setCharacaters] = useState([]);

  const { name, realm } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    fetch(
      `https://raider.io/api/v1/characters/profile?region=us&realm=${Inputs.realm}&name=${Inputs.name}&fields=mythic_plus_weekly_highest_level_runs`
    )
      .then((response) => {
        if (response.ok) return response.json();
        else {
          updateResponse(null);
          alert("there was an error retrieving this character!");
        }
      })
      .then((json) => {
        console.log(json);
      });
  };
  return (
    <Fragment>
      <div className="nav">
        <button className="btn btn-dark btn-sm" onClick={(e) => setAuth(false)}>
          Logout
        </button>
      </div>
      <div className="dashboard">
        <h1 className="container">Add characters</h1>
        <form onSubmit={submit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="form-control my-3"
            onChange={(e) => onChange(e)}
            value={name}
          />
          <input
            type="text"
            name="realm"
            placeholder="realm"
            className="form-control my-3"
            onChange={(e) => onChange(e)}
            value={realm}
          />
          <button className="btn btn-dark btn-block">Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Dashboard;
