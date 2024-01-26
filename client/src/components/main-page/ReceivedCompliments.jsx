import React from "react";
import Compliment from "../user-page/Compliment";

function ReceivedCompliments({
  compliments,
  currentUser,
  hearts,
  handleRefresh,
}) {
  return (
    <div className="messages">
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
