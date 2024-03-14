import React from "react";
import { useHistory } from "react-router-dom";

const Result = (props) => {
  const chars = localStorage.getItem("correctChars");
  const totalChars = localStorage.getItem("totalChars");
  const userOptTime = localStorage.getItem("userTime");
  const userWPM = localStorage.getItem("wpm");
  const userAccuracy = localStorage.getItem("accuracy");

  const history = useHistory();

  const tryAgainHandler = () => {
    history.push("/type-test");
  };

  return (
    <div className="flex flex-col gap-y-20 mt-14 min-h-screen items-center">
      <h2 className="text-2xl md:text-4xl text-purple-700">
        Thank you playing! Your result is:
      </h2>
      <div className="flex gap-52">
        <h2 className="text-xl md:text-3xl w-32">
          characters{" "}
          <span className="text-pink-500" title="total, correct">
            {totalChars}/{chars}
          </span>
        </h2>
        <h2 className="text-xl md:text-3xl w-16">
          time <span className="text-pink-500">{userOptTime}</span>
        </h2>
      </div>
      <div className="flex gap-52">
        <h2 className="text-xl md:text-3xl w-24">
          wpm <span className="text-pink-500">{userWPM}</span>
        </h2>
        <h2 className="text-xl md:text-3xl w-24">
          accuracy <span className="text-pink-500">{userAccuracy}</span>
        </h2>
      </div>

      <div>
        <button
          onClick={tryAgainHandler}
          className="md:text-xl text-orange-500"
        >
          Want to try again! Click Here
        </button>
      </div>
    </div>
  );
};

export default Result;

