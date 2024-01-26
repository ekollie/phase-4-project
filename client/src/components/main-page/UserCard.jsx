import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserCard({ currentUser, user, hearts }) {
  const navigate = useNavigate();
  return (
    <div>
      <a
        onClick={() =>
          navigate(`/users/${user.user_id}`, {
            state: { currentUser, user, hearts},
          })
        }
      >
        <div className="userChat">
          <div className="userChatInfo">
            <span>{user.username}</span>
            <p>Position: {user.position}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default UserCard;
