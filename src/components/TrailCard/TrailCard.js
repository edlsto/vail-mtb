import React from "react";
import "./TrailCard.css";
import { Link } from "react-router-dom";

const getIcon = (difficulty) => {
  switch (difficulty) {
    case "green":
      return <i class="fas fa-circle"></i>;
    case "blue":
      return <i class="fas fa-square-full square"></i>;
    case "black":
      return <i class="fas fa-square-full diamond"></i>;
    default:
      return;
  }
};

const TrailCard = (props) => {
  return (
    <div className="trail-card">
      <img className="trail-card-img" src={props.imgMedium} alt={props.name} />
      <div className="trail-card-info">
        <div className="name-rating-container">
          <div className="trail-card-name">{props.name}</div>
          <div className="trail-card-rating">
            {getIcon(props.difficulty)} {props.length} miles
          </div>
        </div>
        <Link
          to={"/areas/" + props.location.toLowerCase() + "/trails/" + props.id}
          className="trail-card-link area-link"
        >
          More <i class="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default TrailCard;
