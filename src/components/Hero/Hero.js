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

  getWeatherBlurb = (code, temp) => {
    if (code < 800 || temp < 50) {
      return "(Looks like less-than-ideal weather for biking)";
    } else {
      return "Great weather for biking!";
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

  handleAreaChange = (event) => {
    console.log(event.target.value);
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
      var time = moment().toDate(); // This will return a copy of the Date that the moment uses

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
    return (
      <div>
        <div className="hero">
          <div className="hero-text">
            <div className="weather hero-text-section">
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
                : A high of <code>{this.state.tempForecast}</code> degrees with{" "}
                <code>{this.state.weatherForecast}</code>.
              </p>
              <p className="analysis">
                {this.getWeatherBlurb(
                  this.state.weatherCode,
                  this.state.tempForecast
                )}
              </p>
            </div>
            <div className="drive-time hero-text-section">
              <p>
                Drive time: <code>{this.state.travelTime}</code> min. from
                I-70/C470 (Golden)
              </p>

              {this.state.travelTime < 100 ? (
                <p className="analysis">(That's a pretty quick trip!)</p>
              ) : (
                <p>
                  (Expect about <code>{this.state.travelTime - 100}</code>{" "}
                  minutes of delays)
                </p>
              )}
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
