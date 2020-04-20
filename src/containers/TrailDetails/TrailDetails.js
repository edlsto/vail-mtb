import React, { Component } from "react";
import "./TrailDetails.css";
import { connect } from "react-redux";
import Map from "../Map/Map";
import { fetchTrail } from "../../ApiCalls";
import { addFavorite } from "../../actions";
import { deleteFavorite } from "../../actions";
import Bike from "../../assets/bike.jpg";

class TrailDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrail: null,
    };
  }

  addDefaultSrc = (e) => {
    e.target.src = Bike;
  };

  async componentDidMount() {
    const result = await fetchTrail(this.props.id);
    this.setState({
      selectedTrail: result,
    });
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  toggleFavorite = (id, props) => {
    if (!props.favorites.includes(id)) {
      props.addFavorite(id);
    } else {
      props.deleteFavorite(id);
    }
  };

  render() {
    const selectedTrail = this.state.selectedTrail;
    return (
      <div className="trail-detail-card">
        <div className="trail-stats-container">
          <div className="details-title">
            {selectedTrail && selectedTrail.name}
          </div>
          <div className="stars-heart">
            {selectedTrail && (
              <div className="stars">
                <i
                  className={`${
                    selectedTrail.stars > 0.25 ? "fas" : "far"
                  } fa-2x fa-star-half`}
                ></i>
                <i
                  className={`${
                    selectedTrail.stars > 0.75 ? "fas" : "far"
                  } fa-2x fa-star-half star-right star-2`}
                ></i>
                <span className="whole-star-1">
                  <i
                    className={`${
                      selectedTrail.stars > 1.25 ? "fas" : "far"
                    } fa-2x fa-star-half`}
                  ></i>
                  <i
                    className={`${
                      selectedTrail.stars > 1.75 ? "fas" : "far"
                    } fa-2x fa-star-half star-right`}
                  ></i>
                </span>
                <span className="whole-star-2">
                  <i
                    className={`${
                      selectedTrail.stars > 2.25 ? "fas" : "far"
                    } fa-2x fa-star-half`}
                  ></i>
                  <i
                    className={`${
                      selectedTrail.stars > 2.75 ? "fas" : "far"
                    } fa-2x fa-star-half star-right`}
                  ></i>
                </span>
                <span className="whole-star-3">
                  <i
                    className={`${
                      selectedTrail.stars > 3.25 ? "fas" : "far"
                    } fa-2x fa-star-half`}
                  ></i>
                  <i
                    className={`${
                      selectedTrail.stars > 3.75 ? "fas" : "far"
                    } fa-2x fa-star-half star-right`}
                  ></i>
                </span>
                <span className="whole-star-4">
                  <i
                    className={`${
                      selectedTrail.stars > 4.25 ? "fas" : "far"
                    } fa-2x fa-star-half`}
                  ></i>
                  <i
                    className={`${
                      selectedTrail.stars > 4.75 ? "fas" : "far"
                    } fa-2x fa-star-half star-right`}
                  ></i>
                </span>
                <p className="num-votes">({selectedTrail.starVotes} votes)</p>
              </div>
            )}
            <i
              className={` fa-heart fa-2x heart-details ${
                this.props.favorites.includes(parseInt(this.props.id))
                  ? "fas"
                  : "far"
              }`}
              onClick={() =>
                this.toggleFavorite(parseInt(this.props.id), this.props)
              }
            ></i>
          </div>
          <div className="details-summary">
            {selectedTrail && selectedTrail.summary}
          </div>
          <div className="stats-map-container">
            <div className="map-container-details">
              <Map selectedTrail={[selectedTrail]} />
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
              <div className="details-descent details-item">
                Elevation:{" "}
                {selectedTrail &&
                  this.numberWithCommas(Math.abs(selectedTrail.low))}
                {" to "}
                {selectedTrail &&
                  this.numberWithCommas(Math.abs(selectedTrail.high))}{" "}
                feet
              </div>

              <a
                className="more-info-link"
                href={selectedTrail && selectedTrail.url}
              >
                <button className="more-info">More info</button>
              </a>
            </div>
          </div>
        </div>
        <div className="img-container">
          <img
            className="details-photo"
            src={selectedTrail && selectedTrail.imgMedium}
            alt={selectedTrail && selectedTrail.name}
            onError={(e) => this.addDefaultSrc(e)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ trails, favorites }) => ({
  trails,
  favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (id) => dispatch(addFavorite(id)),
  deleteFavorite: (id) => dispatch(deleteFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrailDetails);
