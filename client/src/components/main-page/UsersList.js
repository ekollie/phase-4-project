import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { ref } from "yup";

function UsersList({ compliments, currentUser, hearts }) {
  const [users, setUsers] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5555/users")
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
    <div>
      <ul>
        {users.map((user) => {
          if (user.user_id != currentUser.user_id) {
            return (
              <li style={{ padding: "5px" }}>
                <UserCard
                  key={user.user_id}
                  user={user}
                  compliments={compliments}
                  currentUser={currentUser}
                  hearts={hearts}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default UsersList;
