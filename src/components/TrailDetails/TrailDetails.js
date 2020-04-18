import React, { Component } from "react";
import "./TrailDetails.css";
import { connect } from "react-redux";
import Map from "../Map/Map";
import { fetchTrail } from "../../ApiCalls";

class TrailDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrail: null,
    };
  }

  async componentDidMount() {
    const result = await fetchTrail(this.props.id);
    console.log(result[0]);
    this.setState({
      selectedTrail: result[0],
    });
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const selectedTrail = this.state.selectedTrail;
    console.log(selectedTrail);
    return (
      <div className="trail-detail-card">
        <div className="trail-stats-container">
          <div className="details-title">
            {selectedTrail && selectedTrail.name}
          </div>
          <div className="details-summary">
            {selectedTrail && selectedTrail.summary}
          </div>
          <div className="stats-map-container">
            <div className="map-container-details">
              <Map selectedTrail={selectedTrail} />
            </div>
            <div className="secondary-stats-container">
              <div className="details-length details-item">
                Length: {selectedTrail && selectedTrail.length} miles
              </div>
              <div className="details-ascent details-item">
                Ascent:{" "}
                {selectedTrail && this.numberWithCommas(selectedTrail.ascent)}{" "}
                feet
              </div>
              <div className="details-descent details-item">
                Descent:{" "}
                {selectedTrail &&
                  this.numberWithCommas(Math.abs(selectedTrail.descent))}{" "}
                feet
              </div>
              <button className="more-info">More info</button>
            </div>
          </div>
        </div>
        <div className="img-container">
          <img
            className="details-photo"
            src={selectedTrail && selectedTrail.imgMedium}
            alt={selectedTrail && selectedTrail.name}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ trails }) => ({
  trails,
});

export default connect(mapStateToProps)(TrailDetails);
