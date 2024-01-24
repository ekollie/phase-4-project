import React, { useEffect, useState } from "react";

function Compliment({ currentUser, compliment, hearts, handleRefresh }) {
  const [likedCompliment, setLikedCompliment] = useState(false);

  // Filters hearts related to this specific compliment
  const getComplimentHearts = () => {
    return hearts.filter(
      (heart) => heart.compliment_id === compliment.compliment_id
    );
  };

  // Check if the current user has liked this compliment on component mount
  useEffect(() => {
    handleRefresh();
    getComplimentHearts().forEach((heart) => {
      if (heart.user_id === currentUser.user_id) {
        setLikedCompliment(heart);
      }
    });
  }, []);

  // Toggles the privacy of the compliment
  const handlePrivateToggle = () => {
    fetch(`/compliments/${compliment.compliment_id}`, {
      method: "PATCH",
      body: JSON.stringify({ public: !compliment.public }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => response.json());
    handleRefresh();
  };

  // Handles the liking or unliking of a compliment
  const handleLike = () => {
    let complimentHeart = getComplimentHearts().find(
      (heart) => heart.user_id === currentUser.user_id
    );
    setLikedCompliment(!likedCompliment);

    if (likedCompliment) {
      // If already liked, remove the like
      fetch(`/hearts/${complimentHeart.id}`, { method: "DELETE" })
        .then((response) => response.ok && response.json())
        .catch((error) => console.log("Error removing like", error));
      setLikedCompliment(false);
    } else {
      // If not liked, add a like
      fetch(`/hearts`, {
        method: "POST",
        body: JSON.stringify({
          id: Date.now(),
          compliment_id: compliment.compliment_id,
          heart_id: Date.now(),
          user_id: currentUser.user_id,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.ok && response.json())
        .catch((error) => console.log("Error adding like", error));
      setLikedCompliment(true);
    }
    handleRefresh();
  };

  // Renders the privacy toggle buttons if the current user is the receiver
  const privacyButtons = () => {
    if (compliment.receiver.user_id === currentUser.user_id) {
      return (
        <button onClick={handlePrivateToggle}>
          {compliment.public ? "public" : "private"}
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
      {privacyButtons()}
    </div>
  );
}

export default Compliment;
