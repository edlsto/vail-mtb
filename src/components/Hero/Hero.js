import React, { Component } from "react";
import "./Hero.css";
import { getTrails } from "../../actions";
import { connect } from "react-redux";
import { fetchTrails } from "../../ApiCalls";
import Down from "../../assets/down.png";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import TrailsAreaPreview from "../TrailsAreaPreview/TrailsAreaPreview";
import Map from "../Map/Map";

class Hero extends Component {
  constructor() {
    super();
    this.state = {
      travelTime: null,
      currentTemp: null,
      currentWeather: null,
    };
  }

  convertToFahrenheit = (celsius) => {
    return Math.floor(celsius * (9 / 5) + 32);
  };

  async componentDidMount() {
    const trails = await fetchTrails();
    this.props.getTrails(trails);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=5442727&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          currentTemp: this.convertToFahrenheit(data.main.temp - 273),
          currentWeather: data.weather[0].description,
        })
      );

    fetch(
      `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=39.712264,-105.193971&wayPoint.2=39.6403,-106.3742&heading=270&distanceUnit=mi&key=${process.env.REACT_APP_BINGMAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          travelTime: Math.round(
            data.resourceSets[0].resources[0].travelDurationTraffic / 60
          ),
        })
      );
  }
  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero-text">
            <p>
              It's <code>{this.state.currentTemp}</code> degrees with{" "}
              <code>{this.state.currentWeather}</code> in Vail.
            </p>
            <p>
              Drive time: <code>{this.state.travelTime}</code> min. from
              I-70/C470 (Golden)
            </p>
            <p>A great day to ride a bike!</p>
          </div>
          <div className="nav-down">
            <Link
              to="trails"
              spy={true}
              smooth={true}
              className="circle-button"
            >
              <img className="arrow" src={Down}></img>
            </Link>
            <Link
              className="explore-trails"
              to="trails"
              spy={true}
              smooth={true}
            >
              Explore trails
            </Link>
          </div>
        </div>
        <Element className="trails" name="trails">
          <div className="map-container">
            <Map />
          </div>
          <div className="trail-areas-container">
            <TrailsAreaPreview area="vail" />
            <TrailsAreaPreview area="avon" />
            <TrailsAreaPreview area="minturn" />
          </div>
        </Element>
      </div>
    );
  }
}

const mapStateToProps = ({ trails }) => ({
  trails,
});

const mapDispatchToProps = (dispatch) => ({
  getTrails: (movies) => dispatch(getTrails(movies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
