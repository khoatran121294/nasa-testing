import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import FormInput from "../../components/form-input";
import Collection from "../../components/collection";
import Loading from "../../components/loading";
import CollectionModal from "../collection-modal";
import http from "../../helpers/http";
import "./styles.scss";

class NasaSearch extends Component {
  constructor() {
    super();
    this.state = {
      isOpenAdd: false,
      searchText: "",
      loading: false,
      loaded: false,
      foundNumber: null,
      foundText: null,
      collections: [],
      selectedCollection: {},
    };
  }
  render() {
    const { isOpenAdd, foundNumber, foundText, collections, loading, selectedCollection } = this.state;
    return (
      <div className="search-container">
        <div className="header">
          <span className="title">Search From Nasa</span>
          <Link to="/">
            <span className="link-back">Back to Collection</span>
          </Link>
        </div>
        <div className="main-body">
          <FormInput
            onChange={e => this.setState({ searchText: e.target.value })}
            onKeyPress={this.onKeyPressSearch}
            className="search-input"
          />
          {
            loading ? <Loading /> : (
              <Fragment>
                <div className="search-result">
                  {foundText !== null && (
                    <span className="txt-result">{`${foundNumber} result for "${foundText}"`}</span>
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
            )
          }
        </div>
        <CollectionModal
          isOpen={isOpenAdd}
          toggle={this.onToggleAdd}
          collection={selectedCollection}
          title={"Add to Collection"}
          submitText={"Add"}
        />
      </div>
    );
  }
  showAddForm = (selectedCollection) => {
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
  onKeyPressSearch = e => {
    if (e.key === "Enter") {
      this.onSearch();
    }
  };
  onSearch = async () => {
    const { searchText } = this.state;
    this.setState({
      loading: true,
      loaded: false,
      foundResult: null,
      foundText: null
    });
    try {
      const res = await http.get("search", { q: searchText });
      const items = _.get(res, "data.collection.items", []);
      const collections = items.map(item => {
        const thumnail = _.get(item, "links[0].href");
        console.log("item", item);
        return {
          ..._.get(item, "data[0]", {}),
          thumnail,
        };
      });
      this.setState({
        foundNumber: items.length,
        foundText: searchText,
        collections,
        loading: false,
        loaded: true
      });
    } catch (error) {
      console.log({ ...error });
      this.setState({
        loading: false,
        loaded: false
      });
    }
  };
}

const mapStateToProps = state => {
  const { collections } = state.collectionStore;
  return { collections };
};

export default connect(
  mapStateToProps,
  null
)(NasaSearch);
