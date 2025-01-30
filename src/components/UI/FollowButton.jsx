import React, { useRef, useState } from "react";

const FollowButton = ({ followers }) => {
  const [buttonText, setButtonText] = useState("Follow");
  const [currentFollowers, setCurrentFollowers] = useState(followers);
  const buttonCountRef = useRef(0);

  const handleButtonToggle = () => {
    if (buttonCountRef.current % 2 === 0) {
      // If buttonCountRef is even, increase followers and change button text
      buttonCountRef.current = buttonCountRef.current + 1;
      setButtonText("Unfollow");
      setCurrentFollowers(followers + 1);
    } else {
      // If buttonCountRef is odd, set followers to original api value and change button text
      buttonCountRef.current = buttonCountRef.current - 1;
      setButtonText("Follow");
      setCurrentFollowers(followers);
    }
  };

  return (
    <div className="de-flex-col">
      <div className="profile_follower">
        {currentFollowers ? currentFollowers : followers} followers
      </div>
      <button onClick={handleButtonToggle} className="btn-main">
        {buttonText}
      </button>
    </div>
  );
};

export default FollowButton;
