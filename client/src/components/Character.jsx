import React, { useState, useEffect } from "react";

const Character = (props) => {
  const [status, setStatus] = useState("unknown");
  const checkStatus = (e) => {
    e.preventDefault();
    fetch(
      `http://raider.io/api/v1/characters/profile?region=us&realm=${props.realm}&name=${props.name}&fields=mythic_plus_weekly_highest_level_runs`
    )
      .then((response) => {
        if (response.ok) return response.json();
        else {
          setStatus("negative");
        }
      })
      .then((json) => {
        json
          ? json["mythic_plus_weekly_highest_level_runs"].length === 0
            ? setStatus("negative")
            : setStatus("positive")
          : setStatus("negative");
      });
  };

  const init = () => {
    fetch(
      `http://raider.io/api/v1/characters/profile?region=us&realm=${props.realm}&name=${props.name}&fields=mythic_plus_weekly_highest_level_runs`
    )
      .then((response) => {
        if (response.ok) return response.json();
        else {
          setStatus("negative");
        }
      })
      .then((json) => {
        json
          ? json["mythic_plus_weekly_highest_level_runs"].length === 0
            ? setStatus("negative")
            : setStatus("positive")
          : setStatus("negative");
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "inherit",
        margin: "1em",
        display: "flex",
        width: "40%",
        marginBottom: "2em",
      }}
      className="card char"
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.125em",
            fontWeight: "700",
          }}
        >
          {props.name}
          {status === "unknown" ? (
            <span
              style={{
                height: "25px",
                width: "25px",

                borderRadius: "50%",
                display: "inline-block",
                marginLeft: "0.125em",
              }}
            >
              ?
            </span>
          ) : status === "negative" ? (
            <span
              style={{
                height: "25px",
                width: "25px",

                borderRadius: "50%",
                display: "inline-block",
                marginLeft: "0.125em",
                backgroundColor: "red",
              }}
            >
              X
            </span>
          ) : (
            <span
              style={{
                height: "25px",
                width: "25px",

                borderRadius: "50%",
                display: "inline-block",
                marginLeft: "0.125em",
                backgroundColor: "green",
              }}
            >
              &#10003;
            </span>
          )}
        </p>
        <p style={{ textTransform: "capitalize" }}>Realm : {props.realm}</p>
      </div>

      <button
        style={{ width: " 70%", alignSelf: "center" }}
        className="btn btn-md btn-light"
        onClick={(e) => checkStatus(e)}
      >
        Check
      </button>
      <button
        style={{ width: " 70%", alignSelf: "center" }}
        className="btn  btn-danger"
        onClick={(e) => props.handleRemove(e, props.index)}
      >
        Remove
      </button>
    </div>
  );
};

export default Character;
