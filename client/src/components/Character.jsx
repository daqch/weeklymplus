import React, { useState, useEffect } from "react";
import blank_avatar from "../assets/Orcfemale_nopic.jpg";
import { toast } from "react-toastify";

const Character = (props) => {
  const [status, setStatus] = useState("unknown");
  const [imgsrc, setSrc] = useState("");
  const checkStatus = () => {
    fetch(
      `https://raider.io/api/v1/characters/profile?region=us&realm=${props.realm}&name=${props.name}&fields=mythic_plus_weekly_highest_level_runs`
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

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "inherit",
        margin: "1em",
        width: "40%",
        marginBottom: "2em",
        height: "10em",
        position: "relative",
      }}
      className="card char col-lg-3 col-sm-12 col-md-5"
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
        onClick={(e) => props.handleRemove(e, props.index)}
        style={{
          right: "0.125em",
          top: "0",
          position: "absolute",
          cursor: "pointer",
          alt: "delete",
        }}
      >
        <span role="img" aria-label="delete">
          🗑️
        </span>
      </div>
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
          {props.name ? props.name : "?"}
        </p>
        <p style={{ textTransform: "capitalize", marginBottom: "0.5em" }}>
          Realm : {props.realm}
        </p>
        {status === "unknown" ? (
          <p style={{ color: "grey" }}>N/A</p>
        ) : status === "positive" ? (
          <p style={{ color: "green" }}>
            Completed
            <span role="img" aria-label="check">
              ✔️
            </span>{" "}
          </p>
        ) : (
          <p style={{ color: "red" }}>Not completed</p>
        )}{" "}
      </div>
    </div>
  );
};

export default Character;
