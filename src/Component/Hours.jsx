import React from "react";

export const Hours = ({ totalHours, badHours }) => {
  return (
    <>
      <div className="alert alert-primary" role="alert">
        You could have saved: <span id="hours-saved">{badHours}</span>hrs
      </div>
      <div className="alert alert-success" role="alert">
        Total Hours allocated: <span id="total-hour">{totalHours}</span> hrs
      </div>
    </>
  );
};
