import React, { Fragment, useState } from "react";
import Content from "./Content";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
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
      `http://raider.io/api/v1/characters/profile?region=us&realm=${Inputs.realm}&name=${Inputs.name}&fields=mythic_plus_weekly_highest_level_runs`
    )
      .then((response) => {
        if (response.ok) return response.json();
        else {
          updateResponse(null);
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
      })
      .then((json) => {
        console.log(json);
        updateResponse(json);
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <div className="title">
            <h4>Make a quick query!</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                onChange={handleChange}
                placeholder="Character Name"
                type="text"
                name="name"
                className="form-control my-3"
              ></input>
            </div>
            <div className="form-group">
              <input
                onChange={handleChange}
                placeholder="Realm Name"
                type="text"
                name="realm"
                className="form-control my-3"
              ></input>
              <button type="submit" className="btn btn-md btn-dark">
                Retrieve
              </button>
            </div>
          </form>
          <Content response={response}></Content>
        </header>
      </div>
    </Fragment>
  );
};

export default Home;
