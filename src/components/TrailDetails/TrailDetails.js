import React from "react";
import "./TrailDetails.css";
import { connect } from "react-redux";
import Map from "../Map/Map";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TrailDetails = (props) => {
  const selectedTrail = props.trails.find(
    (trail) => trail.id === parseInt(props.id)
  );
  return (
    <div className="trail-detail-card">
      <div className="trail-stats-container">
        <div className="details-title">{selectedTrail.name}</div>
        <div className="details-summary">{selectedTrail.summary}</div>
        <div className="stats-map-container">
          <div className="map-container-details">
            <Map />
          </div>
          <div className="secondary-stats-container">
            <div className="details-length details-item">
              Length: {selectedTrail.length} miles
            </div>
            <div className="details-ascent details-item">
              Ascent: {numberWithCommas(selectedTrail.ascent)} feet
            </div>
            <div className="details-descent details-item">
              Descent: {numberWithCommas(Math.abs(selectedTrail.descent))} feet
            </div>
            <button className="more-info">More info</button>
          </div>
        </div>
      </div>
      <img
        className="details-photo"
        src={selectedTrail.imgMedium}
        alt={selectedTrail.name}
      />
    </div>
  );
};

const mapStateToProps = ({ trails }) => ({
  trails,
});

export default connect(mapStateToProps)(TrailDetails);
