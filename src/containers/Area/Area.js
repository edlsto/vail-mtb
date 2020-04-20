import React from "react";
import "./Area.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Map from "../Map/Map";

import TrailCard from "../TrailCard/TrailCard";

const Area = ({ trails, area, favorites, pathname }) => {
  let title;
  if (area) {
    title = area.charAt(0).toUpperCase() + area.substr(1);
  }

  let filteredTrails = trails;
  if (!area) {
    filteredTrails = filteredTrails.filter((trail) =>
      favorites.includes(trail.id)
    );
  } else if (area !== "all") {
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
    <div className="area-wrapper">
      {pathname !== "/favorites" ? (
        <div className="area-map-container">
          <Map selectedTrail={filteredTrails} />
        </div>
      ) : (
        !!favorites.length && (
          <div className="area-map-container">
            <Map selectedTrail={filteredTrails} />
          </div>
        )
      )}
      <div className="area-cards-container">
        {area && (
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
              className={`vail-btn area-btn ${
                area === "minturn" ? "active" : ""
              }`}
            >
              Minturn
            </Link>
            <Link
              to="/areas/eagle"
              className={`vail-btn area-btn ${
                area === "eagle" ? "active" : ""
              }`}
            >
              Eagle
            </Link>
            <Link
              to="/areas/all"
              className={`vail-btn area-btn ${area === "all" ? "active" : ""}`}
            >
              All
            </Link>
          </div>
        )}
        {favorites.length === 0 && pathname === "/favorites" ? (
          <div class="no-favorites">
            <h3>You have no favorites!</h3>
          </div>
        ) : (
          ""
        )}
        <div className="area-trails-container">{cards}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ trails, favorites }) => ({
  trails,
  favorites,
});

export default connect(mapStateToProps)(Area);
