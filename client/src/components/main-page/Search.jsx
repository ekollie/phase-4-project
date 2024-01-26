import React, { useState } from "react";

const Search = ({ currentUser }) => {
  return (
    <div className="search">
      <div className="searchForm">
        <input placeholder="Find a user" />
      </div>
      <div className="userCard"></div>
      <div className="userInfo"></div>
    </div>
  );
};

export default Search;
