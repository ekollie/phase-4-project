import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserCard({ currentUser, user }) {
  const navigate = useNavigate();
  return (
    <div>
      <span>Username: {user.username}</span>
      <br></br>
      <span>Position: {user.position}</span>
      <button
        onClick={() =>
          navigate(`/users/${user.user_id}`, {
            state: { currentUser, user },
          })
        }
      >
        view profile
      </button>
    </div>
  );
}

export default UserCard;
