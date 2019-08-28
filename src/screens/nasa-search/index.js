import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../../components/form-input";
import Collection from "../../components/collection";
import Loading from "../../components/loading";
import EmptyAlert from "../../components/empty-alert";
import CollectionModal from "../collection-modal";
import http from "../../helpers/http";
import "./styles.scss";

class NasaSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAdd: false,
      searchText: "",
      loading: false,
      loaded: false,
      foundNumber: null,
      foundText: null,
      collections: [],
      selectedCollection: {}
    };
  }
  render() {
    const {
      isOpenAdd,
      foundNumber,
      foundText,
      collections,
      loading,
      selectedCollection
    } = this.state;
    return (
      <div className="search-container">
        <div className="header">
          <span className="title">Search From Nasa</span>
          <Link to="/">
            <span className="link-back">
              <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </span>
          </Link>
        </div>
        <div className="main-body">
          <FormInput
            onChange={this.onSearchChange}
            className="search-input"
          />
          {loading ? (
            <Loading />
          ) : !foundNumber ? (
            <EmptyAlert message={"List is empty now"} />
          ) : (
            <Fragment>
              <div className="search-result">
                {foundText !== null && (
                  <span className="txt-result">{`${foundNumber} result${
                    foundNumber > 1 ? "s" : ""
                  } for "${foundText}"`}</span>
                )}
              </div>
              <div className="card-flow">
                {collections.map((item, index) => (
                  <div className="card-wrapper" key={index}>
                    <Collection
                      data={item}
                      isAdded={false}
                      showAddForm={() => this.showAddForm(item)}
                    />
                  </div>
                ))}
              </div>
            </Fragment>
          )}
        </div>
        <CollectionModal
          isOpen={isOpenAdd}
          toggle={this.onToggleAdd}
          doActionAfterSaved={this.refreshList}
          collection={selectedCollection}
          title={"Add to Collection"}
          submitText={"Add"}
        />
      </div>
    );
  }
  showAddForm = selectedCollection => {
    this.setState({
      isOpenAdd: true,
      selectedCollection
    });
  };
  onToggleAdd = () => {
    this.setState({
      isOpenAdd: !this.state.isOpenAdd
    });
  };
  searchDebounce = _.debounce(() => {
    this.onSearch();
  }, 2000);

  onSearchChange = e => {
    const searchText = e.target.value;
    this.setState({ searchText });
    if (_.isEmpty(searchText)) {
      this.searchDebounce.cancel();
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: true });
    this.searchDebounce();
  };
  getSavedCollectionIds = () => {
    const savedCollections = _.get(
      this.props,
      "collectionStore.collections",
      []
    );
    return savedCollections.map(item => item.nasa_id);
  };
  onSearch = async () => {
    const { searchText } = this.state;
    const savedCollectionIds = this.getSavedCollectionIds();
    this.setState({
      loading: true,
      loaded: false,
      foundResult: null,
      foundText: null
    });
    try {
      const res = await http.get("search", { q: searchText });
      const items = _.get(res, "data.collection.items", []);
      const collections = items
        .filter(
          item =>
            !_.includes(savedCollectionIds, _.get(item, "data[0].nasa_id"))
        )
        .map(item => {
          const thumnail = _.get(item, "links[0].href");
          return {
            ..._.get(item, "data[0]", {}),
            thumnail
          };
        });
      this.setState({
        foundNumber: collections.length,
        foundText: searchText,
        collections,
        loading: false,
        loaded: true
      });
    } catch (error) {
      this.setState({
        loading: false,
        loaded: false
      });
    }
  };
  refreshList = () => {
    const { collections } = this.state;
    const savedCollectionIds = this.getSavedCollectionIds();
    this.setState({
      collections: collections.filter(
        item => !_.includes(savedCollectionIds, item.nasa_id)
      )
    });
  };
}

const mapStateToProps = state => ({
  collectionStore: state.collectionStore
});

export default connect(
  mapStateToProps,
  null
)(NasaSearch);
