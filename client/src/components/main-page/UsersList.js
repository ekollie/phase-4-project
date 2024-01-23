import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { ref } from "yup";

function UsersList() {
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
        {users.map((user) => (
          <li>
            <UserCard key={user.user_id} user={user} />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
