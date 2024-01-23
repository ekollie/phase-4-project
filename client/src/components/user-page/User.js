import React from "react";
import { useLocation } from "react-router-dom";

function User() {
  const { state } = useLocation();
  const { user } = state;

  return (
    <div>
      <h1>{user.username}</h1>
      <h3>{user.position}</h3>
      {/* Add compliment form */}
    </div>
  );
}

export default User;
