import React, { useEffect, useState } from "react";

function Content({ response }) {
  const content = response ? (
    response["statusCode"] !== 400 ? (
      <div>
        <img src={response["thumbnail_url"]}></img>
        <p>{response["name"]}</p>
        response["mythic_plus_weekly_highest_level_runs"]
        <p>
          Highest Weekly Mythic Plus{" "}
          {response["mythic_plus_weekly_highest_level_runs"][0]["dungeon"]}
          {" " +
            response["mythic_plus_weekly_highest_level_runs"][0][
              "mythic_level"
            ]}
        </p>
      </div>
    ) : (
      <p>Could not find character</p>
    )
  ) : (
    <p></p>
  );

  return <div>{content}</div>;
}

export default Content;
