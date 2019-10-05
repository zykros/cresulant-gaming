import React, { Component } from "react";
import "./App.css";
import Routes from "./router/Routes.js";
import Provider from "./Provider/Provider";

class App extends Component {
  render() {
    return (
      <Provider>
        <Routes />
      </Provider>
    );
  }
}

export default App;
