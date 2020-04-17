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
      zoom: 15,
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
    let bounds;
    if (this.props.trails[0]) {
      bounds = latLngBounds(
        [this.props.trails[0].lat, this.props.trails[0].lng],
        [this.props.trails[0].lat, this.props.trails[0].lng]
      );
      this.props.trails.forEach((trail) => {
        bounds.extend([trail.lat, trail.lng]);
      });
    }

    const position = [this.state.lat, this.state.lng];
    const markers = this.props.trails.map((trail) => {
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
        zoom={this.state.zoom}
        bounds={bounds}
        onClick={this.onMapClicked}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
