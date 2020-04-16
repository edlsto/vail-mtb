import React, { Component } from "react";
import "./App.css";
import Hero from "../Hero/Hero";
import Header from "../Header/Header";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Hero />
      </div>
    );
  }
}

export default App;
