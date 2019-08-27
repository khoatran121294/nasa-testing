import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./home";
import NasaSearch from "./nasa-search";
// import { createBrowserHistory } from "history";
import "./app.scss";

// const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter basename="/">
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route path="/home" component={() => <Home />} />
            <Route path="/nasa-search" component={() => <NasaSearch />} />
            <Route render={() => <div className="NotFoundMessage">404 Page Not Found</div>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
