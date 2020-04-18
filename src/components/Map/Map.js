import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { latLngBounds } from "leaflet";
import { connect } from "react-redux";

import "./Map.css";

class SimpleExample extends Component {
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
    // this.props.highlightListing(this.state.selectedPlace.listing_id);
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: "",
      });
      // this.props.highlightListing(this.state.selectedPlace.listing_id);
    }
  };

  render() {
    let trails;
    if (this.props.selectedTrail) {
      trails = [this.props.selectedTrail];
    } else {
      trails = this.props.trails;
    }
    let bounds;
    console.log(trails[0]);
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
      return (
        <Marker
          position={[trail.lat, trail.lng]}
          onClick={(e) => this.onMarkerClicked(e)}
          listing={trail}
        >
          <Popup>{trail.name}</Popup>
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

export default connect(mapStateToProps)(SimpleExample);
