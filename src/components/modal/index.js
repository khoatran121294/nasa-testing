import React from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

export default props => {
  const { isOpen, toggle, title, children, onSubmit } = props;
  const _cancelText = _.get(props, "cancelText", "Cancel");
  const _submitText = _.get(props, "submitText", "OK");
  return (
    <div className="modal-wrapper" style={{
      display: isOpen ? "flex" : "none"
    }}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <div className="modal-close" onClick={toggle}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </div>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <div className="btn" onClick={toggle}>{_cancelText}</div>
          <div className="btn btn-primary" onClick={onSubmit}>{_submitText}</div>
        </div>
      </div>
      <div className="backdrop" onClick={toggle} />
    </div>
  );
};
