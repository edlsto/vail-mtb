import React, { Component } from "react";
import "./Hero.css";
import { getTrails } from "../../actions";
import { connect } from "react-redux";
import { fetchTrails } from "../../ApiCalls";
import Down from "../../assets/down.png";
import { Link as DomLink } from "react-router-dom";
import * as moment from "moment";

import { Link, Element } from "react-scroll";
import TrailsAreaPreview from "../TrailsAreaPreview/TrailsAreaPreview";

class Hero extends Component {
  constructor() {
    super();
    this.state = {
      travelTime: null,
      tempForecast: null,
      weatherForecast: null,
      noTraffic: null,
      weatherCode: null,
      forecastDay: 0,
      selectedOption: "today",
      forecastArea: "vail",
      dailyForecasts: [],
    };
  }

  widthOfString = (str) => {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "36.8px Rubik";
    var width = ctx.measureText(str).width;
    return width;
  };

  convertToFahrenheit = (celsius) => {
    return Math.floor(celsius * (9 / 5) + 32);
  };

  getWeatherStatus = (code, temp) => {
    if (this.state.weatherCode < 800 || this.state.tempForecast < 50) {
      return 1;
    } else {
      return 0;
    }
  };

  getWeatherBlurb = () => {
    if (this.getWeatherStatus() === 1) {
      return "(Looks like less-than-ideal weather for biking)";
    } else {
      return "Great weather for biking!";
    }
  };

  getWeatherIconColor = () => {
    if (this.getWeatherStatus() === 1) {
      return "red";
    } else {
      return "green";
    }
  };

  getWeatherIcon = () => {
    const weatherCode = this.state.weatherCode;
    if ((weatherCode >= 300) & (weatherCode <= 531)) {
      return "umbrella";
    } else if ((weatherCode >= 200) & (weatherCode <= 232)) {
      return "bolt";
    } else if ((weatherCode >= 600) & (weatherCode <= 622)) {
      return "snowflake";
    } else if ((weatherCode >= 800) & (weatherCode <= 804)) {
      return "cloud";
    } else if (
      (weatherCode >= 700 && weatherCode <= 781) ||
      weatherCode > 800
    ) {
      return "cloud";
    }
  };

  getTrailsStatus = () => {
    const trailsOpenNum = this.countOpenTrails();
    if (trailsOpenNum > 10) {
      return 0;
    } else if (trailsOpenNum > 0) {
      return 1;
    } else {
      return 2;
    }
  };

  getTrailsBlurb = (trails) => {
    const openTrailsNumber = trails.filter(
      (trail) => trail.conditionStatus === "All Clear"
    ).length;
    const closedTrailsNumber = trails.length - openTrailsNumber;
    return (
      <div>
        (<code>{closedTrailsNumber}</code> trails are not reported open)
      </div>
    );
  };

  getTrailsIconColor = () => {
    if (this.getTrailsStatus() > 10) {
      return "green";
    } else if (this.getTrailsStatus() > 0) {
      return "yellow";
    } else {
      return "red";
    }
  };

  trafficDifference = () => {
    return this.state.travelTime - this.state.noTraffic;
  };

  getWeather = (area) => {
    let lat, lng;
    if (area === "vail") {
      lat = 39.6403;
      lng = -106.3742;
    } else if (area === "eagle") {
      console.log("eagle");
      lat = 39.6553;
      lng = -106.8287;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dailyForecasts: data.daily,
          tempForecast: this.convertToFahrenheit(
            data.daily[this.state.forecastDay].temp.max - 273
          ),
          weatherForecast:
            data.daily[this.state.forecastDay].weather[0].description,
          weatherCode: data.daily[this.state.forecastDay].weather[0].id,
        });
      });
  };

  countOpenTrails = () => {
    return this.props.trails.filter(
      (trail) => trail.conditionStatus === "All Clear"
    ).length;
  };

  getTrafficStatus = () => {
    const travelTime = this.state.travelTime;
    if (travelTime && travelTime <= 95) {
      return 0;
    } else if (travelTime > 95 && travelTime < 110) {
      return 1;
    } else if (travelTime >= 110) {
      return 2;
    }
  };

  getTrafficIconColor = (minutes) => {
    if (this.getTrafficStatus() === 0) {
      return "green";
    } else if (this.getTrafficStatus() === 1) {
      return "yellow";
    } else if (this.getTrafficStatus() === 2) {
      return "red";
    }
  };

  getRideStatus = () => {
    console.log(
      this.getWeatherStatus(),
      this.getTrailsStatus(),
      this.getTrafficStatus()
    );
    if (
      this.getWeatherStatus() > 0 ||
      this.getTrailsStatus() > 1 ||
      this.getTrafficStatus() > 1
    ) {
      return "bad";
    } else if (
      this.getWeatherStatus() === 0 &&
      this.getTrailsStatus() <= 1 &&
      this.getTrafficStatus() <= 1
    ) {
      return "OK";
    } else if (
      this.getWeatherStatus() === 0 &&
      this.getTrailsStatus() === 0 &&
      this.getTrafficStatus() <= 1
    ) {
      return "great";
    }
  };

  handleAreaChange = (event) => {
    this.setState(
      { forecastArea: event.target.value },
      this.getWeather(event.target.value)
    );
  };

  handleChange = (event) => {
    let forecastIndex;
    if (event.target.value === "today") {
      forecastIndex = 0;
    } else if (event.target.value === "tomorrow") {
      forecastIndex = 1;
    } else {
      var time = moment().toDate();

      time.setHours(0);
      time.setMinutes(0);
      time.setSeconds(0);
      time.setMilliseconds(0);
      forecastIndex = moment(event.target.value).diff(time, "days");
    }
    this.setState({
      selectedOption: event.target.value,
      forecastDay: forecastIndex,
      tempForecast: this.convertToFahrenheit(
        this.state.dailyForecasts[forecastIndex].temp.max - 273
      ),
      weatherForecast: this.state.dailyForecasts[forecastIndex].weather[0]
        .description,
      weatherCode: this.state.dailyForecasts[forecastIndex].weather[0].id,
    });
  };

  async componentDidMount() {
    const trails = await fetchTrails();
    this.props.getTrails(trails);
    this.setState({
      forecastDay: moment().hour() > 12 ? 1 : 0,
      selectedOption: moment().hour() > 12 ? "tomorrow" : "today",
    });

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=39.6403&lon=-106.3742&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          dailyForecasts: data.daily,
          tempForecast: this.convertToFahrenheit(
            data.daily[this.state.forecastDay].temp.max - 273
          ),
          weatherForecast:
            data.daily[this.state.forecastDay].weather[0].description,
          weatherCode: data.daily[this.state.forecastDay].weather[0].id,
        });
      });

    fetch(
      `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=39.712264,-105.193971&wayPoint.2=39.6403,-106.3742&heading=270&distanceUnit=mi&key=${process.env.REACT_APP_BINGMAPS_API_KEY}`
    )
      .then((response) => response.json())
      // .then((data) => console.log(data.resourceSets[0].resources[0]));
      .then((data) =>
        this.setState({
          travelTime: Math.round(
            data.resourceSets[0].resources[0].travelDurationTraffic / 60
          ),
          noTraffic: Math.round(
            data.resourceSets[0].resources[0].travelDuration / 60
          ),
        })
      );
  }
  render() {
    console.log(this.getRideStatus());
    return (
      <div>
        <div className="hero">
          <div className="hero-text">
            <div className="ride-status">
              <h2>
                It's a <code>{this.getRideStatus()}</code> day to go ride your
                bike in Vail!
              </h2>
            </div>
            <div className="hero-text-sections">
              <div className="hero-text-section open-trails">
                <div
                  className={`hero-icon-wrapper ${this.getTrailsIconColor()}`}
                >
                  <i className="fas fa-bicycle hero-icon"></i>
                </div>
                <p>
                  <code>{this.countOpenTrails(this.props.trails)}</code>
                  {this.countOpenTrails(this.props.trails) > 1 || 0
                    ? " trails are"
                    : " trail is"}{" "}
                  reported open in the Eagle County area
                </p>
                <p className="analysis">
                  {this.getTrailsBlurb(this.props.trails)}
                </p>
              </div>

              <div className="weather hero-text-section">
                <div
                  className={`hero-icon-wrapper ${this.getWeatherIconColor()}`}
                >
                  <i
                    className={`fas fa-${this.getWeatherIcon()} hero-icon`}
                  ></i>
                </div>
                <p>
                  <select
                    name="areas"
                    id="area-select"
                    className="select-menu"
                    style={{
                      width: `${this.widthOfString(
                        this.state.forecastArea + 30
                      )}px`,
                    }}
                    onChange={(event) => {
                      this.handleAreaChange(event);
                    }}
                    value={this.state.forecastArea}
                  >
                    <option value="vail">Vail</option>
                    <option value="eagle">Eagle</option>
                  </select>{" "}
                  forecast for{" "}
                  <select
                    name="days"
                    id="day-select"
                    className="select-menu"
                    style={{
                      width: `${this.widthOfString(
                        this.state.selectedOption.split(", ")[0] + 30
                      )}px`,
                    }}
                    onChange={(event) => {
                      this.handleChange(event);
                    }}
                    value={this.state.selectedOption}
                  >
                    <option value="today">today</option>
                    <option value="tomorrow">tomorrow</option>
                    <option
                      value={moment()
                        .local()
                        .add(2, "d")
                        .format("dddd, MMM. D, YYYY")}
                    >
                      {moment().local().add(2, "d").format("dddd")}
                    </option>
                    <option
                      value={moment()
                        .local()
                        .add(3, "d")
                        .format("dddd, MMM. D, YYYY")}
                    >
                      {moment().local().add(3, "d").format("dddd")}
                    </option>
                    <option
                      value={moment()
                        .local()
                        .add(4, "d")
                        .format("dddd, MMM. D, YYYY")}
                    >
                      {moment().local().add(4, "d").format("dddd")}
                    </option>
                    <option
                      value={moment()
                        .local()
                        .add(5, "d")
                        .format("dddd, MMM. D, YYYY")}
                    >
                      {moment().local().add(5, "d").format("dddd")}
                    </option>
                  </select>
                  : A high of <code>{this.state.tempForecast}</code> degrees
                  with <code>{this.state.weatherForecast}</code>.
                </p>
                <p className="analysis">{this.getWeatherBlurb()}</p>
              </div>
              <div className="drive-time hero-text-section">
                <div
                  className={`hero-icon-wrapper ${this.getTrafficIconColor(
                    this.state.travelTime
                  )}`}
                >
                  <i className="fas fa-car hero-icon"></i>
                </div>
                <p>
                  Drive time: <code>{this.state.travelTime}</code> minutes from{" "}
                  <nobr>I-70/C470</nobr> (Golden)
                </p>

                {this.state.travelTime < 95 ? (
                  <p className="analysis">(That's a pretty quick trip!)</p>
                ) : (
                  <p className="analysis">
                    (Expect about <code>{this.state.travelTime - 95}</code>{" "}
                    minutes of delays)
                  </p>
                )}
              </div>
            </div>
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
          </div>
        </div>
        <Element className="trails" name="trails">
          <DomLink className="explore-trails" to="/areas/all">
            Explore all trails
          </DomLink>
          <div className="trail-areas-container">
            <TrailsAreaPreview area="vail" />
            <TrailsAreaPreview area="avon" />
            <TrailsAreaPreview area="eagle" />
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
