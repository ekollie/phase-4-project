import React from "react";

function ReceivedCompliments({ compliment }) {
  return (
    <div>
      <p>{compliment.date_sent}</p>
      <p>{compliment.compliment_text}</p>
      <br />
    </div>
  );
}

export default ReceivedCompliments;
