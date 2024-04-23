import React from "react";

export const Hours = ({ totalHours }) => {
  return (
    <>
      <div className="alert alert-success" role="alert">
        Total Hours allocated: <span id="total-hour">{totalHours}</span> hour(s)
      </div>
    </>
  );
};
