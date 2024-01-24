import React, { useState, useEffect } from "react";
import UsersList from "./UsersList";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReceivedCompliments from "./ReceivedCompliments";
import { ref } from "yup";

function Main() {
  const { state } = useLocation();
  const { currentUser } = state;
  const [compliments, setCompliments] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  };

  useEffect(() => {
    console.log("Fetching compliments...");
    fetch("/compliments")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((compliments) => {
        return setCompliments(compliments);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("Fetching all hearts...");
    fetch("/hearts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((hearts) => {
        return setHearts(hearts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshPage]);

  return (
    <div>
      <h1> Hello, {currentUser.username}</h1>
      <button onClick={() => navigate(`/`)}>Sign Out</button>
      <div>
        <br />
        <UsersList
          compliments={compliments}
          currentUser={currentUser}
          hearts={hearts}
        />
        <br />
      </div>
      <div>
        <ReceivedCompliments
          compliments={compliments}
          currentUser={currentUser}
          hearts={hearts}
          handleRefresh={handleRefresh}
        />
      </div>
    </div>
  );
}

export default Main;
