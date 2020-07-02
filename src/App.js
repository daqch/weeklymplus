import React, { useState, useEffect } from "react";
import "./App.css";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import chest from "./assets/finalchest.pgn.png";

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
      .then((response) => {
        if (response.ok) return response.json();
        else {
          updateResponse(null);
          alert("there was an error retrieving this character!");
        }
      })
      .then((json) => {
        console.log(json);
        updateResponse(json);
      });
  };

  return (
    <div className="App">
      <Navbar></Navbar>
      <header className="App-header">
        <div className="title">
          <h4>
            Check if you have completed your goals for the week!
            <img src={chest}></img>
          </h4>
        </div>
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
