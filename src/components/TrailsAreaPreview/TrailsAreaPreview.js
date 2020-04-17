import React from "react";
import "./TrailsAreaPreview.css";
import TrailCard from "../TrailCard/TrailCard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const getTrails = (area, trails) => {
  const areaTrails = trails
    .filter((trail) => trail.location === area)
    .slice(0, 3);
  const cards = areaTrails.map((trail) => {
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
  return cards;
};

const TrailsAreaPreview = ({
  trails,
  title,
  area,
  imgMedium,
  difficulty,
  length,
}) => {
  const cards = getTrails(area, trails);
  return (
    <div className="trail-area-container">
      <div className="title-link-container">
        <div className="title">
          <h2>{title}</h2>
        </div>
        <Link to={"/" + title.toLowerCase()} className="area-link">
          See more <i class="fas fa-arrow-right"></i>
        </Link>
      </div>
      <div className="trail-cards-area-preview-container">{cards}</div>
    </div>
  );
};

const mapStateToProps = ({ trails }) => ({
  trails,
});

export default connect(mapStateToProps)(TrailsAreaPreview);
