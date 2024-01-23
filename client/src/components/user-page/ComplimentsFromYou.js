import React from "react";
import Compliment from "./Compliment";

function ComplimentsFromYou({ compliments, hearts }) {
  console.log(compliments);
  return (
    <div>
      {compliments.map((compliment) => {
        return <Compliment compliment={compliment} hearts={hearts} />;
      })}
    </div>
  );
}

export default ComplimentsFromYou;
