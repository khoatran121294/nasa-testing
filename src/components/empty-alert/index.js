import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

export default props => {
  const { message } = props;
  return (
    <div className="empty-alert-container">
      <FontAwesomeIcon icon={faExclamation} size={"4x"} color={"#CCC"} />
      {
        message && <span className="empty-text">{message}</span>
      }
    </div>
  );
};
