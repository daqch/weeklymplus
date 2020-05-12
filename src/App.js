import React, { useState, useEffect } from "react";
import "./App.css";
import Content from "./components/Content";

function App() {
  const [Inputs, changeInputs] = useState({ name: "", realm: "" });
  const [response, updateResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    changeInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://raider.io/api/v1/characters/profile?region=us&realm=${Inputs.realm}&name=${Inputs.name}&fields=mythic_plus_weekly_highest_level_runs`
    )
      .then((response) => response.json())
      .then((data) => updateResponse(data))
      .catch((error) => {
        console.error("character was not found");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Check if you have completed your goals for the week!</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            placeholder="Character Name"
            type="text"
            name="name"
            className="input"
          ></input>
          <input
            onChange={handleChange}
            placeholder="Realm Name"
            type="text"
            name="realm"
            className="input"
          ></input>
          <button type="submit" className="btn btn-md btn-light">
            Retrieve
          </button>
        </form>
        <Content response={response}></Content>
      </header>
    </div>
  );
}

export default App;
