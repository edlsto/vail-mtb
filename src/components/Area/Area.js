import React from "react";
import "./Area.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TrailCard from "../TrailCard/TrailCard";

const Area = ({ trails, area }) => {
  const title = area.charAt(0).toUpperCase() + area.substr(1);

  let filteredTrails = trails;
  if (area !== "all") {
    filteredTrails = trails.filter((trail) => {
      return trail.location === title + ", Colorado";
    });
  }

  const cards = filteredTrails.map((trail) => {
    return (
      <TrailCard
        id={trail.id}
        name={trail.name}
        imgMedium={trail.imgMedium}
        difficulty={trail.difficulty}
        length={trail.length}
        location={trail.location.split(", ")[0]}
      />
    );
  });
  return (
    <div className="area-cards-container">
      <div className="areas-btns">
        <Link
          to="/areas/vail"
          className={`vail-btn area-btn ${area === "vail" ? "active" : ""}`}
        >
          Vail
        </Link>
        <Link
          to="/areas/avon"
          className={`vail-btn area-btn ${area === "avon" ? "active" : ""}`}
        >
          Avon
        </Link>
        <Link
          to="/areas/minturn"
          className={`vail-btn area-btn ${area === "minturn" ? "active" : ""}`}
        >
          Minturn
        </Link>
        <Link
          to="/areas/all"
          className={`vail-btn area-btn ${area === "all" ? "active" : ""}`}
        >
          All
        </Link>
      </div>
      <div className="area-trails-container">{cards}</div>
    </div>
  );
};

const mapStateToProps = ({ trails }) => ({
  trails,
});

export default connect(mapStateToProps)(Area);
