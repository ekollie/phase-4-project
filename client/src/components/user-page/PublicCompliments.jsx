import React from "react";
import Compliment from "./Compliment";

function PublicCompliments({
  compliments,
  hearts,
  currentUser,
  handleRefresh,
}) {
  return (
    <div>
      <h3>Public Compliments</h3>
      <div>
        {compliments.map((compliment) => {
          if (compliment.public == 1) {
            return (
              <Compliment
                currentUser={currentUser}
                compliment={compliment}
                hearts={hearts}
                handleRefresh={handleRefresh}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default PublicCompliments;
