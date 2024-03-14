import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const [timeInSec, setTimeInSec] = useState(60);
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval;
    if (props.userChar.current && timeInSec > 0) {
      interval = setInterval(() => {
        setTimeInSec((prevSec) => prevSec - 1);
      }, 1000);
    }else if (timeInSec === 0){
      props.onTimeOver()
        clearInterval(interval)
        props.userChar.current = ""
    }

    return () => clearInterval(interval);
  }, [props.userChar.current, timeInSec]);

  const formatTime = (time) => {
    return `${String(time).padStart(2, "0")}`;
  };

  const timerOption = [15, 30, 60, 90];

  const userOptionHandler = (option) => {
    // console.log(option);
    setIsActive(true)
    setTimeInSec(option || 60);
    localStorage.setItem("userTime", option)
  };

  return (
    <div className="mt-20">
      <div className="flex gap-8 bg-purple-400 rounded-lg p-2 ">
        {timerOption.map((opt) => (
          <button key={opt} className={isActive && timeInSec === opt ? "text-pink-600" : ""} onClick={() => userOptionHandler(opt)}>
            {opt}
          </button>
        ))}
      </div>
      <h1 className="font-medium md:text-xl mt-4 text-center">
        Timer: {formatTime(timeInSec)}
      </h1>
    </div>
  );
};

export default Timer;
