import React from "react";
import "./TrailCard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFavorite } from "../../actions";
import { deleteFavorite } from "../../actions";
import Bike from "../../assets/bike.jpg";
import PropTypes from "prop-types";

const getIcon = (difficulty) => {
  switch (difficulty) {
    case "green":
      return <i className="fas fa-circle circle"></i>;
    case "blue":
      return <i className="fas fa-square-full square"></i>;
    case "black":
      return <i className="fas fa-square-full diamond"></i>;
    default:
      return;
  }
};

const toggleFavorite = (id, props) => {
  if (!props.favorites.includes(id)) {
    props.addFavorite(id);
  } else {
    props.deleteFavorite(id);
  }
};

const addDefaultSrc = (ev) => {
  ev.target.src = Bike;
};

const TrailCard = (props) => {
  return (
    <div className="trail-card">
      <div className="trail-card-img-container">
        <Link
          to={"/areas/" + props.location.toLowerCase() + "/trails/" + props.id}
        >
          <img
            className="trail-card-img"
            src={props.imgMedium}
            alt={props.name}
            onError={(e) => addDefaultSrc(e)}
          />
        </Link>
        <i
          data-testid={props.id}
          className={`fas fa-heart fa-2x card-heart ${
            props.favorites.includes(props.id) ? "favorite" : ""
          }`}
          onClick={() => toggleFavorite(props.id, props)}
        ></i>
      </div>
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
          More <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ favorites }) => ({ favorites });
const mapDispatchToProps = (dispatch) => ({
  addFavorite: (id) => dispatch(addFavorite(id)),
  deleteFavorite: (id) => dispatch(deleteFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrailCard);

TrailCard.propTypes = {
  addFavorite: PropTypes.func,
  deleteFavorite: PropTypes.func,
  favorites: PropTypes.array,
  imgMedium: PropTypes.string,
  length: PropTypes.number,
  location: PropTypes.string,
  name: PropTypes.string,
};
