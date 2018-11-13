import React, { Component } from "react";
import Pagination from "./Pagination";
import CreateContact from "./CreateContact";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pagination/>
        <CreateContact />
      </div>
    );
  }
}

export default App;
