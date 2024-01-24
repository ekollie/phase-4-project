import React, { useEffect, useState } from "react";

function Compliment({ currentUser, compliment, handleRefresh }) {
  const [likedCompliment, setLikedCompliment] = useState(false);
  const [publicToggle, setPublicToggle] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  // Filters hearts related to this specific compliment
  const getComplimentHearts = () => {
    return hearts.filter(
      (heart) => heart.compliment_id === compliment.compliment_id
    );
  };

  // Check if the current user has liked this compliment on component mount and syncs public state
  useEffect(() => {
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
    getComplimentHearts().forEach((heart) => {
      if (heart.user_id === currentUser.user_id) {
        setLikedCompliment(true);
      }
    });
    setPublicToggle(compliment.public);
  }, [refreshPage]);

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

  // Handles the liking or unliking of a compliment
  const handleLike = () => {
    let complimentHeart = getComplimentHearts().find(
      (heart) => heart.user_id === currentUser.user_id
    );
    setLikedCompliment(!likedCompliment);

    if (likedCompliment) {
      // If already liked, remove the like
      let queriedHeart = getComplimentHearts().find((heart) => {
        return heart.user_id === currentUser.user_id;
      });
      console.log(queriedHeart);
      fetch(`/hearts/${queriedHeart.heart_id}`, { method: "DELETE" })
        .then((response) => response.ok && response.json())
        .catch((error) => console.log("Error removing like", error));
    } else {
      // If not liked, add a like
      fetch(`/hearts`, {
        method: "POST",
        body: JSON.stringify({
          // id: Date.now(),
          compliment_id: compliment.compliment_id,
          // heart_id: Date.now(),
          user_id: currentUser.user_id,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.ok && response.json())
        .catch((error) => console.log("Error adding like", error));
    }
    handleRefresh();
    setRefreshPage(!refreshPage);
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
          onClick={handleLike}
        >
          Like
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
