import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import NasaSearch from "./nasa-search";
import "./app.scss";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/home" component={() => <Home />} />
          <Route path="/nasa-search" component={() => <NasaSearch />} />
          <Route render={() => <div className="NotFoundMessage">404 Page Not Found</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
