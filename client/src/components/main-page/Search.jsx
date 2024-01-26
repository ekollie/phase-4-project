import React, { useState } from "react";

const Search = ({ currentUser }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSearch = () => {
    return;
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="userCard"></div>
      <div className="userInfo">
        <span>Joe</span>
      </div>
    </div>
  );
};

export default Search;
