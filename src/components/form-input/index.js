import React from "react";
import "./styles.scss";
import { className } from "postcss-selector-parser";

export default props => {
  return (
    <div className="form-wrapper">
      <input
        className={`form-input ${props.className}`}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        placeholder={"Type something to search..."}
      />
    </div>
  );
};
