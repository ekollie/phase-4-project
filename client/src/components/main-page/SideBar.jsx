import React from "react";
import UsersList from "./UsersList";
import NavBar from "./NavBar";
import Search from "./Search";

function SideBar({ compliments, currentUser, hearts }) {
  return (
    <div className="sidebar">
      <NavBar currentUser={currentUser} />
      <Search currentUser={currentUser}/>
      <UsersList
        compliments={compliments}
        currentUser={currentUser}
        hearts={hearts}
      />
    </div>
  );
}

export default SideBar;
