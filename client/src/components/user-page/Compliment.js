import React, { useEffect, useState } from "react";

function Compliment({ currentUser, compliment, handleRefresh }) {
  const [likedCompliment, setLikedCompliment] = useState(false);
  const [publicToggle, setPublicToggle] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  // Filters hearts related to this specific compliment
  const getComplimentHearts = () => {
    console.log("hearts: ", hearts);
    console.log("compliment: ", compliment);
    return hearts.filter(
      (heart) => heart.compliment_id == compliment.compliment_id
    );
  };

  const getHearts = () => {
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
  };

  // Check if the current user has liked this compliment on component mount and syncs public state
  useEffect(() => {
    console.log("Fetching all hearts...");
    getHearts();
    setPublicToggle(compliment.public);
  }, []);

  // Toggles the public of the compliment
  const handlePublicToggle = () => {
    fetch(`/compliments/${compliment.compliment_id}`, {
      method: "PATCH",
      body: JSON.stringify({ public: !publicToggle }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => response.json());
    // handleRefresh();
    setPublicToggle(!publicToggle);
  };

  const handleClick = () => {
    console.log(likedCompliment);
    // setLikedCompliment(!likedCompliment);
    handleLike();
  };

  // Handles the liking or unliking of a compliment
  const handleLike = () => {
    // setRefreshPage(!refreshPage);
    if (likedCompliment) {
      // If already liked, remove the like
      let queriedHeart = getComplimentHearts().find((heart) => {
        return heart.user_id === currentUser.user_id;
      });
      console.log("Deleting...");
      console.log("getComplimentHearts: ", getComplimentHearts());
      // console.log("queried heart: ", queriedHeart);
      console.log("queriedHeart.id: ", queriedHeart.heart_id);
      fetch(`/hearts/${queriedHeart.heart_id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            console.log("Setting liked compliments to false");
            setLikedCompliment(false);
            getHearts();
          }
        })
        .catch((error) => console.log("Error removing like", error));
    } else {
      // If not liked, add a like
      fetch(`/hearts`, {
        method: "POST",
        body: JSON.stringify({
          compliment_id: compliment.compliment_id,
          user_id: currentUser.user_id,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => {
          if (response.ok) {
            setLikedCompliment(true);
            console.log("Setting liked compliments to true");
            getHearts();
          }
        })
        .catch((error) => console.log("Error adding like", error));
    }
    // handleRefresh();
  };

  // Renders the public toggle buttons if the current user is the receiver
  const publicButtons = () => {
    if (compliment.receiver.user_id === currentUser.user_id) {
      return (
        <button onClick={handlePublicToggle}>
          {publicToggle ? "public" : "private"}
        </button>
      );
    }
  };

  // Renders the like button if the current user is not the sender
  const likeButton = () => {
    if (compliment.sender.user_id !== currentUser.user_id) {
      return (
        <button
          style={
            likedCompliment ? { color: "white", backgroundColor: "red" } : {}
          }
          onClick={handleClick}
        >
          likedCompliment: {`${likedCompliment}`}
        </button>
      );
    }
  };

  return (
    <div>
      <span>| {compliment.date_sent} |</span>
      <span>| {compliment.compliment_text} |</span>
      <span>| Hearts: {getComplimentHearts().length} |</span>
      {likeButton()}
      {publicButtons()}
    </div>
  );
}

export default Compliment;
