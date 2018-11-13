import React, { Component } from "react";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListContacts />
        <CreateContact />
      </div>
    );
  }
}

export default App;
