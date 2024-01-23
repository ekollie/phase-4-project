import React from "react";

function Compliment({ compliment, hearts }) {
  return (
    <div>
      <p>{compliment.date_sent}</p>
      <p>{compliment.compliment_text}</p>
      <p>{}</p>
    </div>
  );
}

export default Compliment;
