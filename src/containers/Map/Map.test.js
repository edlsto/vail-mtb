import React from "react";
import Map from "./Map";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";

describe("map tests", () => {
  let match, initialState, testStore, testWrapper;
  beforeEach(() => {
    initialState = {
      trails: [
        {
          id: 4362647,
          key: 4362647,
          name: "Pool and Ice Rink Loop",
          difficulty: "blue",
          location: "Eagle, Colorado",
          imgMedium:
            "https://cdn-files.apstatic.com/mtb/7019125_medium_1554924200.jpg",
          lat: 39.6431,
          lng: -106.816,
          length: 8.6,
          conditionStatus: "Unknown",
        },
        {
          id: 13489,
          key: 13489,
          name: "Big Mamba",
          difficulty: "blue",
          location: "Vail, Colorado",
          imgMedium:
            "https://cdn-files.apstatic.com/mtb/49323_medium_1554166915.jpg",
          lat: 39.6199,
          lng: -106.3875,
          length: 3,
          conditionStatus: "Unknown",
        },
      ],
    };
  });

  it("should render the text we expect", () => {
    const store = createStore(rootReducer, initialState);
    const { getByText, debug } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Map area="vail" />
        </BrowserRouter>
      </Provider>
    );
    const leaflet = getByText("Leaflet");
    expect(leaflet).toBeInTheDocument();
  });
});
