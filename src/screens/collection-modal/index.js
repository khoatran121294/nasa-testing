import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Modal from "../../components/modal";
import { COLLECTION_TYPE, COLLECTION_TYPES } from "../../constants";
import { SAVE_COLLECTION } from "../../actions";
import "./styles.scss";

const initialState = {
  title: "",
  description: "",
  media_type: COLLECTION_TYPE.IMAGE,
  thumnail: "",
  fileUrl: "",
  invalidTitle: null,
  invalidDescription: null,
  invalidThumnail: null,
  invalidFileUrl: null,
}
class CollectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }
  render() {
    const {
      title,
      description,
      media_type,
      thumnail,
      fileUrl,
      invalidTitle,
      invalidDescription,
      invalidThumnail,
      invalidFileUrl
    } = this.state;
    return (
      <Modal
        {...this.props}
        toggle={() => {
          this.props.toggle();
          this.setState({ ...initialState });
        }}
        onSubmit={this.onSave}
      >
        <div className={`form-control ${invalidTitle ? "invalid" : ""}`}>
          <span className="form-label">
            Title {` `}
            <span className="required">*</span>
          </span>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <div className={`form-control ${invalidDescription ? "invalid" : ""}`}>
          <span className="form-label">
            Description {` `}
            <span className="required">*</span>
          </span>
          <textarea
            className="form-textarea"
            width="100%"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
          />
        </div>
        <div className={`form-control`}>
          <span className="form-label">Type {` `}</span>
          <select
            className="form-select" 
            value={media_type} 
            onChange={e => this.setState({ media_type: e.target.value })}
          >
            {COLLECTION_TYPES.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={`form-control ${invalidThumnail ? "invalid" : ""}`}>
          <span className="form-label">
            Link preview image url {` `}
            <span className="required">*</span>
          </span>
          <input
            type="text"
            className="form-input"
            value={thumnail}
            onChange={e => this.setState({ thumnail: e.target.value })}
          />
        </div>
        <div className={`form-control ${invalidFileUrl ? "invalid" : ""}`}>
          <span className="form-label">
            Link file url {` `}
            <span className="required">*</span>
          </span>
          <input
            type="text"
            className="form-input"
            value={fileUrl}
            onChange={e => this.setState({ fileUrl: e.target.value })}
          />
        </div>
      </Modal>
    );
  }
  componentDidUpdate(prevProps) {
    const { collection, isOpen } = this.props;
    if (isOpen !== prevProps.isOpen) {
      this.setState({ ...collection });
    }
  }
  onSave = () => {
    const {
      collection,
      doActionAfterSaved,
      toggle,
      saveCollection
    } = this.props;
    const { title, description, media_type, thumnail, fileUrl } = this.state;
    if (!this.isFormValid()) {
      return;
    }
    saveCollection({
      ...collection,
      title,
      description,
      media_type,
      thumnail,
      fileUrl
    });
    if (doActionAfterSaved) {
      doActionAfterSaved();
    }
    toggle();
    this.setState({ ...initialState });
  };
  isFormValid = () => {
    const { title, description, thumnail, fileUrl } = this.state;
    const invalidTitle = _.isEmpty(title);
    const invalidDescription = _.isEmpty(description);
    const invalidThumnail = _.isEmpty(thumnail);
    const invalidFileUrl = _.isEmpty(fileUrl);
    this.setState({
      invalidTitle,
      invalidDescription,
      invalidThumnail,
      invalidFileUrl
    });
    if (
      invalidTitle ||
      invalidDescription ||
      invalidThumnail ||
      invalidFileUrl
    ) {
      return false;
    }
    return true;
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveCollection: collection => {
      dispatch({ type: SAVE_COLLECTION, collection });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CollectionModal);
