import React, { useEffect, useState } from "react";

function Compliment({ currentUser, compliment, hearts, handleRefresh }) {
  const [likedCompliment, setLikedCompliment] = useState(false);
  let currentDate = new Date().toJSON().slice(0, 10);

  const getComplimentHearts = () => {
    return hearts.filter((heart) => {
      return heart.compliment_id === compliment.compliment_id;
    });
  };

  useEffect(() => {
    handleRefresh();
    getComplimentHearts().forEach((heart) => {
      if (
        heart.user_id === currentUser.user_id &&
        heart.compliment_id === compliment.compliment_id
      ) {
        setLikedCompliment(heart);
      }
    });
  }, []);

  const handlePrivateToggle = () => {
    fetch(`/compliments/${compliment.compliment_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        public: !compliment.public,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    handleRefresh();
  };

  const handleLike = () => {
    let complimentHeart = getComplimentHearts().filter((heart) => {
      return heart.user_id === currentUser.user_id;
    });
    setLikedCompliment(!likedCompliment);
    if (likedCompliment) {
      fetch(`/hearts/${complimentHeart[0].id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error();
        })
        .then((json) => console.log(json))
        .catch((error) => {
          console.log("Something went wrong", error);
        });
      setLikedCompliment(false);
    } else {
      fetch(`/hearts`, {
        method: "POST",
        body: JSON.stringify({
          id: Date.now(),
          compliment_id: compliment.compliment_id,
          heart_id: Date.now(),
          user_id: currentUser.user_id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error();
        })
        .then((newHeart) => setLikedCompliment(true))
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
    handleRefresh();
    console.log(likedCompliment);
  };

  const privacyButtons = () => {
    if (compliment.receiver.user_id === currentUser.user_id) {
      return (
        <span>
          {compliment.public ? (
            <button onClick={() => handlePrivateToggle()}>public</button>
          ) : (
            <button onClick={() => handlePrivateToggle()}>private</button>
          )}
        </span>
      );
    }
  };
  const likeButton = () => {
    if (compliment.sender.user_id !== currentUser.user_id) {
      return (
        <span>
          {likedCompliment ? (
            <button
              style={{ color: "white", backgroundColor: "red" }}
              onClick={() => handleLike()}
            >
              Like
            </button>
          ) : (
            <button onClick={() => handleLike()}>Like</button>
          )}
        </span>
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
      <br />
    </div>
  );
}

export default Compliment;
