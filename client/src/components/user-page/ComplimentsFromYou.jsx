import React from "react";
import UserCompliment from "./UserCompliment";

function ComplimentsFromYou({
  currentUser,
  compliments,
  hearts,
  handleRefresh,
}) {
  return (
    <div className="chats">
      <h3 style={{ color: "white", margin: "15px" }}>
        Your compliments to {compliments[1]?.receiver?.username}
      </h3>
      <div>
        {compliments.map((compliment) => {
          if (compliment.sender.user_id === currentUser.user_id) {
            return (
              <UserCompliment
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
