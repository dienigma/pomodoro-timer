import React from "react";

export const SetTimer = (props) => (
  <div id={props.timerID} className="timer-container">
    <h2>{props.title}</h2>
    <div className="flex actions-wrapper">
      <button onClick={props.handleDecrease} id={props.decID}>
        <i className="fa fa-minus" />
      </button>
      <span id={props.lenID}>{props.count}</span>
      <button onClick={props.handleIncrease} id={props.incID}>
        <i className="fa fa-plus" />
      </button>
    </div>
  </div>
);
