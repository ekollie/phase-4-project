import React from "react";

function Input() {
  return (
    <div className="chatInfo">
      <div className="send">
        <img alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img alt="" />
        </label>
      </div>
    </div>
  );
}

export default Input;
