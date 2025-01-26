import { useEffect, useState } from "react";

const CountDown = ({ expiryDate }) => {
  const [displayTime, setDisplayTime] = useState("");
  const [timeInterval, setTimeInterval] = useState();
  let secsLeft;
  let minsLeft;
  let hoursLeft;

  function calculateTime() {
    const milisLeft = expiryDate - Date.now();

    if (milisLeft < 0) {
      clearInterval(timeInterval);
      setDisplayTime("ENDED");
      return;
    }

    secsLeft = milisLeft / 1000;
    minsLeft = secsLeft / 60;
    hoursLeft = minsLeft / 60;

    setDisplayTime(
      `${Math.floor(hoursLeft)}h ${Math.floor(minsLeft % 60)}m ${Math.floor(
        secsLeft % 60
      )}s`
    );
  }

  useEffect(() => {
    calculateTime();

    // Lines 34-41 allows countdown timer to display live countdown with updates in 1000 milis intervals
    const timeInterval = setInterval(() => {
      calculateTime();
    }, 1000);

    setTimeInterval(timeInterval);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return <div className="de_countdown">{displayTime}</div>;
};

export default CountDown;
