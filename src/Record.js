import React from "react";

const Record = ({ data, state }) => {
  const { fields, id } = data;
  const { rating, year } = state;

  const ratingMatches = parseInt(rating, 10) === fields["Rating"];
  const yearMatches = parseInt(year, 10) === fields["Year"];

  const isVisible = () => {
    if (!year && !rating) {
      return "visible";
    }

    if (ratingMatches || yearMatches) {
      return "visible";
    }

    return "hidden";
  };

  return (
    <div
      key={id}
      data-yearmatch={yearMatches}
      data-ratingmatch={ratingMatches}
      className={`flex justify-between ${isVisible()}`}
    >
      <div>{fields["Album Title"]}</div>
      <div>{fields["Artist"]}</div>
      <div>{fields["Year"]},</div>
      <div>{fields["Tracks"]}</div>
      <div>{fields["Rating"]}</div>
      {parseFloat(fields["Score"])}
    </div>
  );
};

export default Record;
