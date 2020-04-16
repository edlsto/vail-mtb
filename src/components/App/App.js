import React, { Component } from "react";
import "./App.css";
import Hero from "../Hero/Hero";

class App extends Component {
  componentDidMount() {
    fetch(
      `https://www.mtbproject.com/data/get-trails?lat=39.6403&lon=-106.3742&maxDistance=10&key=${process.env.REACT_APP_MTBPROJECT_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=5442727&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return <div>hi</div>;
  }
}

export default App;
