import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Modal from "../../components/modal";
import { COLLECTION_TYPE, COLLECTION_TYPES } from "../../constants";
import { SAVE_COLLECTION } from "../../actions";
import "./styles.scss";

class CollectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      type: COLLECTION_TYPE.IMAGE,
      thumnail: "",
      fileUrl: "",
    };
  }
  render() {
    const { title, description, type, thumnail, fileUrl } = this.state;
    return (
      <Modal
        {...this.props}
        onSubmit={this.onSave}
      >
        <div className="form-control">
          <span className="form-label">
            Title {` `}
            <span className="required">*</span>
          </span>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={e => {
              console.log("e.target.value", e.target.value);
              this.setState({ title: e.target.value })
            }}
          />
        </div>
        <div className="form-control">
          <span className="form-label">Description {` `}</span>
          <textarea
            className="form-textarea"
            width="100%"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
          />
        </div>
        <div className="form-control">
          <span className="form-label">Type {` `}</span>
          <select className="form-select">
            {COLLECTION_TYPES.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
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
        <div className="form-control">
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
  componentDidUpdate (prevProps) {
    const { collection, isOpen } = this.props;
    if (isOpen !== prevProps.isOpen) {
      this.setState({ ...collection });
    }
  }
  onSave = () => {
    const { collection } = this.props;
    console.log("collection", collection);
    const { title, description, type, thumnail, fileUrl } = this.state;
    this.props.saveCollection({
      ...collection,
      title,
      description, 
      type, 
      thumnail, 
      fileUrl,
    });
    this.props.toggle();
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
