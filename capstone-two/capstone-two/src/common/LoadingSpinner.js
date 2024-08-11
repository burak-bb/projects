import React from "react";
import "./LoadingSpinner.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
      <div className="LoadingSpinner">
        <FontAwesomeIcon icon={faSpinner}/>
      </div>
  );
}

export default LoadingSpinner;