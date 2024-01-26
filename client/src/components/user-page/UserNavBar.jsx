import React from "react";
import { useNavigate } from "react-router-dom";

const UserNavBar = ({ currentUser }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <span className="logo">UNITE</span>
      <div className="user">
        <span>{currentUser.username}</span>
        <button
          onClick={() =>
            navigate("/main", {
              state: { currentUser },
            })
          }
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserNavBar;
