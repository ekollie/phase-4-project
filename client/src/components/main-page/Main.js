import React, { useState, useEffect } from "react";
import UsersList from "./UsersList";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReceivedCompliments from "./ReceivedCompliments";
import { ref } from "yup";

function Main() {
  // Extracting the current user from the route state
  const { state } = useLocation();
  const { currentUser } = state;

  // State variables for compliments, hearts, and page refresh indicator
  const [compliments, setCompliments] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  // Navigation hook to move between pages
  const navigate = useNavigate();

  // Function to trigger a page refresh
  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  };

  // Effect to fetch compliments and hearts data on component mount and page refresh
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
      {/* Displaying the current user's username and a Sign Out button */}
      <h1> Hello, {currentUser.username}</h1>
      <button onClick={() => navigate(`/`)}>Sign Out</button>

      {/* Displaying the UsersList component */}
      <div>
        <br />
        <UsersList
          compliments={compliments}
          currentUser={currentUser}
          hearts={hearts}
        />
        <br />
      </div>

      {/* Displaying the ReceivedCompliments component */}
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