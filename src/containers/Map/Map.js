import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { latLngBounds } from "leaflet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import RouterForwarder from "../../components/RouterForwarder";

import "./Map.css";

class TrailMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 39.742043,
      lng: -104.991531,
      zoom: 10,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClicked = (e) => {
    const listing = e.target.options.listing;
    this.setState({
      selectedPlace: listing,
      showingInfoWindow: true,
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: "",
      });
    }
  };

  render() {
    let trails;
    if (this.props.selectedTrail && this.props.selectedTrail[0]) {
      trails = this.props.selectedTrail;
    } else {
      trails = this.props.trails;
    }
    let bounds;
    if (trails.length) {
      bounds = latLngBounds(
        [trails[0].lat, trails[0].lng],
        [trails[0].lat, trails[0].lng]
      );
      trails.forEach((trail) => {
        bounds.extend([trail.lat, trail.lng]);
      });
    }
    const position = [this.state.lat, this.state.lng];
    const markers = trails.map((trail) => {
      const area = trail.location.split(" ")[0].toLowerCase();
      return (
        <Marker
          position={[trail.lat, trail.lng]}
          onClick={(e) => this.onMarkerClicked(e)}
          listing={trail}
          key={trail.id}
        >
          <Popup>
            <RouterForwarder context={this.context}>
              <Link to={`/areas/${area}/trails/${trail.id}`}>{trail.name}</Link>
            </RouterForwarder>
          </Popup>
        </Marker>
      );
    });

    return (
      <Map
        center={position}
        bounds={bounds}
        onClick={this.onMapClicked}
        maxZoom={15}
      >
        <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    );
  }
}

const mapStateToProps = ({ trails }) => ({
  trails,
});

export default connect(mapStateToProps)(TrailMap);

Map.propTypes = {
  bounds: PropTypes.object,
  center: PropTypes.array,
  children: PropTypes.array,
  maxZoom: PropTypes.number,
  onClick: PropTypes.func,
};
