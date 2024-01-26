import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { ref } from "yup";
import NavBar from "./NavBar";

function UsersList({ compliments, currentUser, hearts }) {
  const [users, setUsers] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    fetch("/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshPage]);

  return (
    <div className="chats">
      {users.map((user) => {
        if (user.user_id != currentUser.user_id) {
          return (
            <UserCard
              key={user.user_id}
              user={user}
              compliments={compliments}
              currentUser={currentUser}
              hearts={hearts}
            />
          );
        }
      })}
    </div>
  );
}

export default UsersList;
