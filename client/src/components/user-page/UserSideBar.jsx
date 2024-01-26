import React from "react";
import UserNavBar from "./UserNavBar";
import ComplimentsFromYou from "./ComplimentsFromYou";

function UserSideBar({ compliments, currentUser, hearts }) {
  return (
    <div className="sidebar">
      <UserNavBar currentUser={currentUser} />
      <p>{compliments.receiver}</p>
      <ComplimentsFromYou
        compliments={compliments}
        currentUser={currentUser}
        hearts={hearts}
      />
    </div>
  );
}

export default UserSideBar;
