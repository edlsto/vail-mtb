import React from "react";
import "./Area.css";
import { connect } from "react-redux";
import TrailCard from "../TrailCard/TrailCard";

const Area = ({ trails, area }) => {
  const title = area.charAt(0).toUpperCase() + area.substr(1);

  const filteredTrails = trails.filter((trail) => {
    console.log(area);

    return trail.location === title + ", Colorado";
  });
  console.log(filteredTrails);
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
      <div className="area-title">{title} trails</div>
      <div className="area-trails-container">{cards}</div>
    </div>
  );
};

const mapStateToProps = ({ trails }) => ({
  trails,
});

export default connect(mapStateToProps)(Area);
