import React, { Component } from "react";
import "./App.css";
import Hero from "../../containers/Hero/Hero";
import Header from "../Header/Header";
import { Route } from "react-router-dom";
import Area from "../../containers/Area/Area";
import TrailDetails from "../../containers/TrailDetails/TrailDetails";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Route
          exact
          path="/"
          render={() => {
            return <Hero />;
          }}
        ></Route>
        <Route
          exact
          path="/areas/:area"
          render={({ match }) => {
            const { area } = match.params;
            return <Area area={area} />;
          }}
        ></Route>
        <Route
          exact
          path="/favorites"
          render={({ match, history }) => {
            const { pathname } = history.location;
            return <Area pathname={pathname} />;
          }}
        ></Route>
        <Route
          exact
          path="/areas/:area/trails/:id"
          render={({ match }) => {
            const { id } = match.params;
            return <TrailDetails id={parseInt(id)} />;
          }}
        ></Route>
      </div>
    );
  }
}

export default App;
