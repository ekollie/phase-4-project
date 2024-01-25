import React, { useEffect, useState } from "react";

// PRE REFACTOR

// function Compliment({ currentUser, compliment, handleRefresh }) {
//   const [likedCompliment, setLikedCompliment] = useState(false);
//   const [hearts, setHearts] = useState([]);

//   // Filters hearts related to this specific compliment
//   const getComplimentHearts = () => {
//     console.log("hearts: ", hearts);
//     console.log("compliment: ", compliment);
//     return hearts.filter(
//       (heart) => heart.compliment_id == compliment.compliment_id
//     );
//   };

//   const getHearts = () => {
//     fetch("/hearts")
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error("Something went wrong");
//       })
//       .then((hearts) => {
//         hearts.forEach((heart) => {
//           if (
//             currentUser.user_id === heart.user_id &&
//             compliment.compliment_id === heart.compliment_id
//           ) {
//             return setLikedCompliment(true);
//           }
//         });
//         setHearts(hearts);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // Check if the current user has liked this compliment on component mount and syncs public state
//   useEffect(() => {
//     console.log("Fetching all hearts...");
//     getHearts();
//     setPublicToggle(compliment.public);
//   }, []);

//   // Toggles the public of the compliment
//   const handlePublicToggle = () => {
//     fetch(`/compliments/${compliment.compliment_id}`, {
//       method: "PATCH",
//       body: JSON.stringify({ public: !publicToggle }),
//       headers: { "Content-type": "application/json; charset=UTF-8" },
//     }).then((response) => response.json());
//     // handleRefresh();
//     setPublicToggle(!publicToggle);
//   };

//   const handleClick = () => {
//     console.log(likedCompliment);
//     // setLikedCompliment(!likedCompliment);
//     handleLike();
//   };

//   // Handles the liking or unliking of a compliment
//   const handleLike = () => {
//     // setRefreshPage(!refreshPage);
//     if (likedCompliment) {
//       // If already liked, remove the like
//       let queriedHeart = getComplimentHearts().find((heart) => {
//         return heart.user_id === currentUser.user_id;
//       });
//       console.log("Deleting...");
//       console.log("getComplimentHearts: ", getComplimentHearts());
//       // console.log("queried heart: ", queriedHeart);
//       console.log("queriedHeart.id: ", queriedHeart.heart_id);
//       fetch(`/hearts/${queriedHeart.heart_id}`, { method: "DELETE" })
//         .then((response) => {
//           if (response.ok) {
//             console.log("Setting liked compliments to false");
//             setLikedCompliment(false);
//             getHearts();
//           }
//         })
//         .catch((error) => console.log("Error removing like", error));
//     } else {
//       // If not liked, add a like
//       fetch(`/hearts`, {
//         method: "POST",
//         body: JSON.stringify({
//           compliment_id: compliment.compliment_id,
//           user_id: currentUser.user_id,
//         }),
//         headers: { "Content-type": "application/json; charset=UTF-8" },
//       })
//         .then((response) => {
//           if (response.ok) {
//             setLikedCompliment(true);
//             console.log("Setting liked compliments to true");
//             getHearts();
//           }
//         })
//         .catch((error) => console.log("Error adding like", error));
//     }
//     // handleRefresh();
//   };

//   // Renders the public toggle buttons if the current user is the receiver
//   const publicButtons = () => {
//     if (compliment.receiver.user_id === currentUser.user_id) {
//       return (
//         <button onClick={handlePublicToggle}>
//           {publicToggle ? "public" : "private"}
//         </button>
//       );
//     }
//   };

//   // Renders the like button if the current user is not the sender
//   const likeButton = () => {
//     if (compliment.sender.user_id !== currentUser.user_id) {
//       return (
//         <button
//           style={
//             likedCompliment ? { color: "white", backgroundColor: "red" } : {}
//           }
//           onClick={handleClick}
//         >
//           likedCompliment: {`${likedCompliment}`}
//         </button>
//       );
//     }
//   };

//   return (
//     <div>
//       <span>| {compliment.date_sent} |</span>
//       <span>| {compliment.compliment_text} |</span>
//       <span>| Hearts: {getComplimentHearts().length} |</span>
//       {likeButton()}
//       {publicButtons()}
//     </div>
//   );
// }

// POST REFACTOR
function Compliment({
  currentUser,
  compliment: initialCompliment,
  handleRefresh,
}) {
  const [likedCompliment, setLikedCompliment] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [compliment, setCompliment] = useState(initialCompliment);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    fetchHearts();
    checkIfLiked();
  }, [refreshPage]);

  const fetchHearts = () => {
    fetch("/hearts")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch hearts");
        return response.json();
      })
      .then((hearts) => {
        setHearts(hearts);
        checkIfLiked(hearts);
      })
      .catch((error) => console.error("Error fetching hearts:", error));
  };

  const checkIfLiked = (hearts) => {
    if (!hearts) return; // Since setHearts is async, this is to prevent an error being raised while hearts is temporarily undefined

    const isLiked = hearts.some(
      (heart) =>
        heart.user_id === currentUser.user_id &&
        heart.compliment_id === compliment.compliment_id
    );
    setLikedCompliment(isLiked);
  };

  const handleLike = () => {
    const newLikedStatus = !likedCompliment;
    const method = likedCompliment ? "DELETE" : "POST";
    const endpoint = likedCompliment ? `/hearts/${findHeartId()}` : `/hearts`;

    //Optimistically update the UI
    setLikedCompliment(newLikedStatus);
    if (newLikedStatus) {
      setHearts([
        ...hearts,
        {
          user_id: currentUser.user_id,
          compliment_id: compliment.compliment_id,
          heart_id: "temp", // Temporary ID until the server responds
        },
      ]);
    } else {
      setHearts(
        hearts.filter(
          (heart) =>
            !(
              heart.compliment_id === compliment.compliment_id &&
              heart.user_id === currentUser.user_id
            )
        )
      );
    }

    fetch(endpoint, {
      method,
      body: !newLikedStatus
        ? null
        : JSON.stringify({
            compliment_id: compliment.compliment_id,
            user_id: currentUser.user_id,
          }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update to like status");
        if (newLikedStatus) handleRefresh();
        setRefreshPage(!refreshPage);
      })
      .catch((error) => {
        console.error("Error updating like status:", error);
        // Rollback the optimistic update on error
        setLikedCompliment(!newLikedStatus);
        fetchHearts(); // Re-fetch hearts to ensure sync with server
      });
  };

  const findHeartId = () => {
    const heart = hearts.find((heart) => {
      return (
        heart.user_id === currentUser.user_id &&
        heart.compliment_id === compliment.compliment_id
      );
    });

    // If heart is null or undefined, it will stop the expression evaluation and return undefined instead of throwing an error.
    return heart?.heart_id;
  };
  const handlePublicToggle = () => {
    const newPublicStatus = !compliment.public;

    // Optimistically update UI
    setCompliment({ ...compliment, public: newPublicStatus });

    fetch(`/compliments/${compliment.compliment_id}`, {
      method: "PATCH",
      body: JSON.stringify({ public: newPublicStatus }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to toggle public status");
        handleRefresh();
      })
      .catch((error) => {
        console.error("Error toggling public status:", error);
        // Rollback the optimistic update on error
        setCompliment({ ...compliment, public: !newPublicStatus });
      });
  };

  const renderLikeButton = () => (
    <button
      style={likedCompliment ? { color: "white", backgroundColor: "red" } : {}}
      onClick={handleLike}
    >
      {likedCompliment ? "Unlike" : "Like"}
    </button>
  );

  const renderPublicToggleButton = () => (
    <button onClick={handlePublicToggle}>
      {compliment.public ? "Set Private" : "Set Public"}
    </button>
  );

  return (
    <div>
      <span>| {compliment.date_sent} |</span>
      <span>| {compliment.compliment_text} |</span>
      <span>
        | Hearts:
        {
          hearts.filter(
            (heart) => heart.compliment_id === compliment.compliment_id
          ).length
        }
        |
      </span>
      {compliment.sender.user_id !== currentUser.user_id && renderLikeButton()}
      {compliment.receiver.user_id === currentUser.user_id &&
        renderPublicToggleButton()}
    </div>
  );
}

export default Compliment;
