import React, { Component } from "react";
import MainPage from "./components/MainPage";

import "./custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <MainPage />
      </div>
    );
  }
}
