import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

export default props => {
  return (
    <div className="loading-container">
      <FontAwesomeIcon icon={faSpinner} size={"2x"} color={"#CCC"} spin />
    </div>
  );
};
