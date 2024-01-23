import React, { useState, useEffect } from "react";
import UsersList from "./UsersList";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReceivedCompliments from "./ReceivedCompliments";

function Main() {
  const { state } = useLocation();
  const { currentUser } = state;
  const [compliments, setCompliments] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    console.log("Fetching users...");
    fetch("/compliments")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        data.forEach((compliment) => {
          if (compliment.receiver.user_id === currentUser.user_id) {
            setCompliments((prev) => {
              return [...prev, compliment];
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshPage]);

  return (
    <div>
      <h1> Hello, {currentUser.username}</h1>
      <div>
        <UsersList />
        <br />
      </div>
      <div>
        <h3>Received Compliments</h3>
        {compliments.map((compliment) => {
          return <ReceivedCompliments compliment={compliment} />;
        })}
      </div>
    </div>
  );
}

export default Main;
