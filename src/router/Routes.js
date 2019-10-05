import React, { Component, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Contexts } from "../Provider/Provider";

import Home from "../components/Home";
import Game from "../components/Game";
import Search from "../components/Search";
import Filter from "../components/Filter";
import Browse from "../components/Browse";
import Signup from "../components/Signup";
import Trending from "../components/Trending";

import MainMenu from "./MainMenu";

const Routes = () => {
  const { state } = useContext(Contexts);
  return (
    <Router>
      <div>
        <Route component={MainMenu} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/games/:slug"
            render={props => {
              return (
                <Game
                  key={props.match.params.slug}
                  contextprops={state}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/search/:name"
            render={props => (
              <Search key={props.match.params.name} {...props} />
            )}
          />
          <Route exact path="/browse" component={Browse} />
          <Route
            path="/browse/:filter"
            render={props => (
              <Filter key={props.match.params.filter} {...props} />
            )}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/trending" component={Trending} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
