import React from "react";
import Compliment from "./Compliment";

function ComplimentsFromYou({
  currentUser,
  compliments,
  hearts,
  handleRefresh,
}) {
  return (
    <div>
      <h3>Compliments from you</h3>
      <div>
        {compliments.map((compliment) => {
          if (compliment.sender.user_id === currentUser.user_id) {
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

export default ComplimentsFromYou;
