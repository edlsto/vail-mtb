import React, { Component } from "react";
import "./Hero.css";
import { getTrails } from "../../actions";
import { connect } from "react-redux";
import { fetchTrails, fetchWeather, fetchTraffic } from "../../ApiCalls";
import { widthOfString, capitalize } from "../../helpers";
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
      weatherCode: null,
      forecastDay: 0,
      selectedOption: "today",
      forecastArea: "vail",
      dailyForecasts: [],
    };
  }

  getWeatherStatus = (code, temp) => {
    if (this.state.weatherCode < 800 || this.state.tempForecast < 50) {
      return 1;
    } else {
      return 0;
    }
  };

  getWeatherBlurb = () => {
    if (this.getWeatherStatus() === 1) {
      return "(Not the best weather for biking)";
    } else {
      return "(Great weather for biking!)";
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
    const trailsOpenNum = this.countOpenTrails()[0];
    if (trailsOpenNum > 10) {
      return 0;
    } else if (trailsOpenNum > 0) {
      return 1;
    } else {
      return 2;
    }
  };

  getTrailsBlurb = (trails) => {
    const closedTrailsNumber = this.countOpenTrails()[1];
    return (
      <div>
        (<code>{closedTrailsNumber}</code> trails are not reported open)
      </div>
    );
  };

  getTrailsIconColor = () => {
    if (this.getTrailsStatus() === 0) {
      return "green";
    } else if (this.getTrailsStatus() === 1) {
      return "yellow";
    } else {
      return "red";
    }
  };

  getLatLng = (area) => {
    let lat, lng;
    if (area === "vail") {
      lat = 39.6403;
      lng = -106.3742;
    } else if (area === "eagle") {
      lat = 39.6553;
      lng = -106.8287;
    }
    return [lat, lng];
  };

  getWeather = (area) => {
    const [lat, lng] = this.getLatLng(area);
    fetchWeather(lat, lng).then((data) => {
      this.setState({
        dailyForecasts: data,
        tempForecast: data[this.state.forecastDay].temp.max,
        weatherForecast: data[this.state.forecastDay].weather[0].description,
        weatherCode: data[this.state.forecastDay].weather[0].id,
      });
    });
  };

  countOpenTrails = () => {
    let areaTrails;
    if (this.state.forecastArea === "vail") {
      areaTrails = this.props.trails.filter(
        (trail) =>
          trail.location.split(", ")[0].toLowerCase() === "vail" ||
          trail.location.split(", ")[0].toLowerCase() === "edwards" ||
          trail.location.split(", ")[0].toLowerCase() === "avon" ||
          trail.location.split(", ")[0].toLowerCase() === "minturn"
      );
    } else if (this.state.forecastArea === "eagle") {
      areaTrails = this.props.trails.filter(
        (trail) => trail.location.split(", ")[0].toLowerCase() === "eagle"
      );
    }
    let openTrails = areaTrails.filter(
      (trail) => trail.conditionStatus === "All Clear"
    ).length;
    let closedTrails = areaTrails.length - openTrails;
    return [openTrails, closedTrails];
  };

  getTraffic = (area, time) => {
    const [lat, lng] = this.getLatLng(area);
    fetchTraffic(lat, lng, time).then((data) =>
      this.setState({
        travelTime: Math.round(data / 60),
      })
    );
  };

  getTrafficStatus = () => {
    const travelTime = this.state.travelTime;
    if (travelTime && travelTime <= this.getClearTrafficTime()) {
      return 0;
    } else if (
      travelTime > this.getClearTrafficTime() &&
      travelTime < this.getClearTrafficTime() * 1.2
    ) {
      return 1;
    } else if (this.getClearTrafficTime() * 1.2) {
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

  getClearTrafficTime = () => {
    const area = this.state.forecastArea;
    if (area === "vail") {
      return 95;
    } else if (area === "eagle") {
      return 120;
    }
  };

  getRideStatus = () => {
    if (
      this.getWeatherStatus() > 0 ||
      this.getTrailsStatus() > 1 ||
      this.getTrafficStatus() > 1
    ) {
      return "less than ideal";
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
    this.getTraffic(
      event.target.value,
      moment()
        .local()
        .add(this.state.forecastDay, "d")
        .format("MM/DD/YYYY 09:00:00")
    );
  };

  handleDayChange = (event) => {
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
      tempForecast: this.state.dailyForecasts[forecastIndex].temp.max,
      weatherForecast: this.state.dailyForecasts[forecastIndex].weather[0]
        .description,
      weatherCode: this.state.dailyForecasts[forecastIndex].weather[0].id,
    });
    this.getTraffic(
      this.state.forecastArea,
      moment().local().add(forecastIndex, "d").format("MM/DD/YYYY 09:00:00")
    );
  };

  async componentDidMount() {
    const trails = await fetchTrails();
    this.props.getTrails(trails);
    this.setState({
      forecastDay: moment().hour() > 12 ? 1 : 0,
      selectedOption: moment().hour() > 12 ? "tomorrow" : "today",
    });

    fetchWeather(...this.getLatLng("vail")).then((data) => {
      this.setState({
        dailyForecasts: data,
        tempForecast: data[this.state.forecastDay].temp.max,
        weatherForecast: data[this.state.forecastDay].weather[0].description,
        weatherCode: data[this.state.forecastDay].weather[0].id,
      });
    });

    fetchTraffic(...this.getLatLng("vail")).then((data) =>
      this.setState({
        travelTime: Math.round(data / 60),
      })
    );
  }

  renderAreaSelect = () => (
    <select
      name="areas"
      id="area-select"
      className="select-menu"
      style={{
        width: `${widthOfString(this.state.forecastArea + 30)}px`,
      }}
      onChange={(event) => {
        this.handleAreaChange(event);
      }}
      value={this.state.forecastArea}
    >
      <option value="vail">Vail</option>
      <option value="eagle">Eagle</option>
    </select>
  );

  renderDaySelect = () => (
    <select
      name="days"
      id="day-select"
      className="select-menu"
      style={{
        width: `${widthOfString(
          this.state.selectedOption.split(", ")[0] + 30
        )}px`,
      }}
      onChange={(event) => {
        this.handleDayChange(event);
      }}
      value={this.state.selectedOption}
    >
      <option value="today">Today</option>
      <option value="tomorrow">Tomorrow</option>
      <option value={moment().add(2, "d").format("dddd, MMM. D, YYYY")}>
        {moment().add(2, "d").format("dddd")}
      </option>
      <option value={moment().add(3, "d").format("dddd, MMM. D, YYYY")}>
        {moment().add(3, "d").format("dddd")}
      </option>
      <option value={moment().add(4, "d").format("dddd, MMM. D, YYYY")}>
        {moment().add(4, "d").format("dddd")}
      </option>
      <option value={moment().add(5, "d").format("dddd, MMM. D, YYYY")}>
        {moment().add(5, "d").format("dddd")}
      </option>
    </select>
  );

  getTrafficBlurb = () =>
    this.state.travelTime < this.getClearTrafficTime() ? (
      <p className="analysis">(That's a pretty quick trip!)</p>
    ) : (
      <p className="analysis">
        (Expect about{" "}
        <code>{this.state.travelTime - this.getClearTrafficTime()}</code>{" "}
        minutes of delays)
      </p>
    );

  renderOpenTrailsSection = () => (
    <div className="hero-text-section open-trails">
      <div className={`hero-icon-wrapper ${this.getTrailsIconColor()}`}>
        <i className="fas fa-bicycle hero-icon"></i>
      </div>
      <p>
        <code>{this.countOpenTrails()[0]}</code>
        {this.countOpenTrails()[0] > 1 || this.countOpenTrails()[0] === 0
          ? " trails are"
          : " trail is"}{" "}
        reported open in the {capitalize(this.state.forecastArea)} area
      </p>
      <p className="analysis">{this.getTrailsBlurb(this.props.trails)}</p>
    </div>
  );

  renderWeatherSection = () => (
    <div className="weather hero-text-section">
      <div className={`hero-icon-wrapper ${this.getWeatherIconColor()}`}>
        <i className={`fas fa-${this.getWeatherIcon()} hero-icon`}></i>
      </div>
      <p>
        {capitalize(this.state.forecastArea)} forecast for{" "}
        {this.state.selectedOption.split(", ")[0]}: A high of{" "}
        <code>{this.state.tempForecast}</code> degrees with{" "}
        <code>{this.state.weatherForecast}</code>.
      </p>
      <p className="analysis">{this.getWeatherBlurb()}</p>
    </div>
  );

  renderTrafficSection = () => (
    <div className="drive-time hero-text-section">
      <div
        className={`hero-icon-wrapper ${this.getTrafficIconColor(
          this.state.travelTime
        )}`}
      >
        <i className="fas fa-car hero-icon"></i>
      </div>
      <p>
        Drive time: <code>{this.state.travelTime}</code> min. from{" "}
        <nobr>I-70/C470</nobr> starting at 10am
      </p>

      {this.getTrafficBlurb()}
    </div>
  );

  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero-text">
            <div className="ride-status">
              <p>
                {this.renderDaySelect()} is{" "}
                {this.getRideStatus() === "OK" ? "an" : "a"}{" "}
                <code>{this.getRideStatus()}</code> day to ride your bike in{" "}
                {this.renderAreaSelect()}
              </p>
            </div>
            <div className="hero-text-sections">
              {this.renderOpenTrailsSection()}
              {this.renderWeatherSection()}
              {this.renderTrafficSection()}
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
