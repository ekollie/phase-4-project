import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ComplimentsFromYou from "./ComplimentsFromYou";
import PublicCompliments from "./PublicCompliments";
import NewComplimentForm from "./NewComplimentForm";

function User() {
  const { state } = useLocation();
  const { currentUser, user, hearts } = state;
  const [compliments, setCompliments] = useState([]);
  const [refreshPage, setRefreshPage] = useState([]);
  // adding state to keep track of heart likes that are public in each user's profile current user is checking out
  //const [publicHearts, setPublicHearts] = useState([]);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  };

  useEffect(() => {
    console.log("Fetching compliments...");
    fetch("/compliments")
      .then((res) => res.json())
      .then((data) => {
        console.log(
          data.filter((compliment) => {
            return (
              compliment.sender.user_id === currentUser.user_id &&
              compliment.receiver.user_id === user.user_id
            );
          })
        );
        setCompliments(() => {
          return data.filter((compliment) => {
            return (
              compliment.sender.user_id === currentUser.user_id &&
              compliment.receiver.user_id === user.user_id
            );
          });
        });
      });
  }, [refreshPage]);

  return (
    <div>
      <div>
        <h1>{user.username}</h1>
        <button
          onClick={() =>
            navigate(`/main`, {
              state: { currentUser },
            })
          }
        >
          Back
        </button>
        <br />
        <p>Position: {user.position}</p>
        <p>Email: {user.email}</p>
      </div>
      <div>
        <ComplimentsFromYou
          currentUser={currentUser}
          compliments={compliments}
          hearts={hearts}
          handleRefresh={handleRefresh}
        />
      </div>
      <div>
        <PublicCompliments
          currentUser={currentUser}
          compliments={compliments}
          hearts={hearts}
          handleRefresh={handleRefresh}
        />
      </div>
      <div>
        <NewComplimentForm
          user={user}
          currentUser={currentUser}
          handleRefresh={handleRefresh}
        />
      </div>
    </div>
  );
}

export default User;