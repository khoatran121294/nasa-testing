import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Collection from "../../components/collection";
import CollectionModal from "../../screens/collection-modal";
import { DELETE_COLLECTION, TOGGLE_FAVOURITE } from "../../actions";
import EmptyAlert from "../../components/empty-alert";
import "./styles.scss";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isOpenEdit: false,
      selectedCollection: null
    };
  }
  render() {
    const { collections } = this.props.collectionStore;
    const isEmpty = _.isEmpty(collections);
    const { isOpenEdit, selectedCollection } = this.state;
    return (
      <div className="home-container">
        <div className="header">
          <span className="title">Nasa Collection</span>
          <Link to="/nasa-search" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </Link>
        </div>
        <div className="main-body">
          {
            isEmpty ? <EmptyAlert message={"Collection is empty"} /> : this.renderCollectionList(collections)
          }
        </div>
        <CollectionModal
          isOpen={isOpenEdit}
          toggle={this.onToggleEdit}
          collection={selectedCollection}
          title={"Edit Collection"}
          submitText={"Edit"}
        />
      </div>
    );
  }
  renderCollectionList = (collections) => (
    <div className="card-flow">
      {collections.map((item, index) => (
        <div className="card-wrapper" key={index}>
          <Collection
            data={item}
            isAdded={true}
            showEditForm={() => this.showEditForm(item)}
            onDelete={() => this.onRemoveCollection(item.nasa_id)}
            onToggleFavourite={() => this.onToggleFavourite(item.nasa_id)}
          />
        </div>
      ))}
    </div>
  );
  showEditForm = selectedCollection => {
    this.setState({
      isOpenEdit: true,
      selectedCollection
    });
  };
  onToggleEdit = () => {
    this.setState({
      isOpenEdit: !this.state.isOpenEdit
    });
  };
  onRemoveCollection = nasa_id => {
    this.props.deleteCollection(nasa_id);
  };
  onToggleFavourite = nasa_id => {
    this.props.toggleFavourite(nasa_id);
  };
}
const mapStateToProps = state => ({
  collectionStore: state.collectionStore
});
const mapDispatchToProps = dispatch => {
  return {
    deleteCollection: nasa_id => dispatch({ type: DELETE_COLLECTION, nasa_id }),
    toggleFavourite: nasa_id => dispatch({ type: TOGGLE_FAVOURITE, nasa_id }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
