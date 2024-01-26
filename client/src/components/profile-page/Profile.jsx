import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { currentUser } = state;
  return (
    <div>
      <h1>Profile</h1>
      <button
        onClick={() =>
          navigate(`/main`, {
            state: { currentUser },
          })
        }
      >
        Back
      </button>
    </div>
  );
}

export default Profile;
