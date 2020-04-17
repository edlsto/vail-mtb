import React from "react";
import "./TrailDetails.css";
import { connect } from "react-redux";

const TrailDetails = (props) => {
  const selectedTrail = props.trails.find(
    (trail) => trail.id === parseInt(props.id)
  );
  console.log(selectedTrail);
  return (
    <div>
      <div>{selectedTrail.name}</div>
      <div>{selectedTrail.summary}</div>
      <div>Length: {selectedTrail.length}</div>
      <div>Ascent: {selectedTrail.ascent}</div>
      <div>Descent: {selectedTrail.descent}</div>
      <img src={selectedTrail.imgMedium} alt={selectedTrail.name} />
    </div>
  );
};

const mapStateToProps = ({ trails }) => ({
  trails,
});

export default connect(mapStateToProps)(TrailDetails);
