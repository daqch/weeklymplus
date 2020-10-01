import React from "react";

function Content({ response }) {
  return response ? (
    response["mythic_plus_weekly_highest_level_runs"].length === 0 ? (
      <p>No mythics completed</p>
    ) : (
      <div className={"content"}>
        <img alt="avatar" src={response["thumbnail_url"]}></img>
        <p>
          Highest mythic plus completed
          {" " +
            response["mythic_plus_weekly_highest_level_runs"][0][
              "mythic_level"
            ]}
        </p>
      </div>
    )
  ) : (
    <p></p>
  );
}

export default Content;
