import React, { Fragment, useState } from "react";
import blank_avatar from "../assets/Orcfemale_nopic.jpg";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [Inputs, changeInputs] = useState({ name: "", realm: "" });
  const [status, setStatus] = useState("unknown");
  const [imgsrc, setSrc] = useState("");

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
          setStatus("unknown");
          toast.error("Character not found 😐", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .then((json) => {
        console.log(json);
        if (json) {
          json["mythic_plus_weekly_highest_level_runs"].length === 0
            ? setStatus("negative")
            : setStatus("positive");
          setSrc(json["thumbnail_url"]);
        } else {
          setStatus("unknown");
        }
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div
        className="container  d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="jumbotron">
          <h2 style={{ textAlign: "center" }} className="display-4">
            All your characters,{" "}
          </h2>
          <h2 style={{ textAlign: "center" }} className="display-4">
            one site.{" "}
            <span role="img" aria-label="arrow">
              🏹
            </span>{" "}
          </h2>
          <p className="lead">
            Check if you have completed a mythic plus dungeon this week, or
            create an account to save
          </p>
          <hr className="my-4" />
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
        </div>
        <div
          style={{
            backgroundColor: "inherit",
            margin: "1em",
            width: "40%",
            marginBottom: "2em",
            height: "10em",
          }}
          className="card char"
        >
          <img
            style={{
              marginLeft: "0",
              height: "100%",
              width: "50%",
              display: "inline-block",
            }}
            alt="character-avatar"
            src={
              imgsrc && (status === "positive" || status === "negative")
                ? imgsrc
                : blank_avatar
            }
          ></img>
          <div
            style={{
              textAlign: "center",
              padding: "1em",
              width: "50%",
              display: "inline-block",
            }}
          >
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.125em",
                fontWeight: "700",
              }}
            >
              {Inputs.name ? Inputs.name : "?"}
            </p>
            <p style={{ textTransform: "capitalize", marginBottom: "0.5em" }}>
              Realm : {Inputs.realm}
            </p>
            {status === "unknown" ? (
              <p style={{ color: "grey" }}>N/A</p>
            ) : status === "positive" ? (
              <p style={{ color: "green" }}>
                Completed{" "}
                <span role="img" aria-label="check">
                  ✔️
                </span>{" "}
              </p>
            ) : (
              <p style={{ color: "red" }}>Not completed</p>
            )}{" "}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
