import React from "react";
import Compliment from "../user-page/Compliment";

function ReceivedCompliments({
  compliments,
  currentUser,
  hearts,
  handleRefresh,
}) {
  return (
    <div>
      <h3>Received compliments</h3>
      <div>
        {compliments.map((compliment) => {
          if (compliment.receiver.user_id === currentUser.user_id) {
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

export default ReceivedCompliments;