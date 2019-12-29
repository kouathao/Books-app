import React, { Component } from "react";

// components
import Header from "./components/Header/Header";
import Data from "./components/Data/Data";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container pt-5">
          <Data />
        </div>
      </div>
    );
  }
}

export default App;
