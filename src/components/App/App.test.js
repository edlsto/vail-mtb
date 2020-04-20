import React from "react";
import App from "./App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";

describe("app tests", () => {
  let initialState;

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
        {
          id: 1,
          key: 1,
          name: "M trail 1",
          difficulty: "blue",
          location: "Minturn, Colorado",
          imgMedium:
            "https://cdn-files.apstatic.com/mtb/49323_medium_1554166915.jpg",
          lat: 39.6199,
          lng: -106.3875,
          length: 3,
          conditionStatus: "Unknown",
        },
        {
          id: 2,
          key: 2,
          name: "M trail 2",
          difficulty: "blue",
          location: "Minturn, Colorado",
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
    const history = createMemoryHistory();
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    expect(getByText("vAiL mTb")).toBeInTheDocument();
    expect(getByText("Favorites")).toBeInTheDocument();
    expect(getByText("See more Vail trails")).toBeInTheDocument();
    expect(getByText("Big Mamba")).toBeInTheDocument();
    expect(getByText("Pool and Ice Rink Loop")).toBeInTheDocument();
    expect(getByAltText("Pool and Ice Rink Loop")).toBeInTheDocument();
  });

  it("should go to favorites page, which says you have no favorites", () => {
    const store = createStore(rootReducer, initialState);
    const history = createMemoryHistory();
    const { getByText, getByAltText, debug } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(getByText("Favorites")).toBeInTheDocument();

    const button = getByText("Favorites");
    fireEvent.click(button);
    expect(getByText("You have no favorites!")).toBeInTheDocument();
  });

  it("should be able to favorite a trail, then see it in favorites with map", () => {
    const store = createStore(rootReducer, initialState);
    const history = createMemoryHistory();
    const { getByText, getByTestId, queryByText, debug } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    expect(getByText("Favorites")).toBeInTheDocument();
    expect(getByTestId("13489")).toBeInTheDocument();

    const heartBtn = getByTestId("13489");
    fireEvent.click(heartBtn);
    const button = getByText("Favorites");
    fireEvent.click(button);
    expect(getByText("Big Mamba")).toBeInTheDocument();
    const leaflet = getByText("Leaflet");
    expect(leaflet).toBeInTheDocument();
    expect(queryByText("Pool and Ice Rink Loop")).toBeNull();
  });

  it("should be able to unfavorite a trail, then see 'no favorites'", () => {
    const store = createStore(rootReducer, initialState);
    const history = createMemoryHistory();
    const { getByText, getByTestId, queryByText, debug } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    expect(getByText("Favorites")).toBeInTheDocument();
    expect(getByTestId("13489")).toBeInTheDocument();

    const heartBtn = getByTestId("13489");
    fireEvent.click(heartBtn);
    fireEvent.click(heartBtn);
    const button = getByText("Favorites");
    fireEvent.click(button);
    expect(getByText("You have no favorites!")).toBeInTheDocument();
  });

  it("should be able to go to an areas page", () => {
    const store = createStore(rootReducer, initialState);
    const history = createMemoryHistory();
    const { getByText, getByTestId, queryByText, debug } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(getByText("Big Mamba")).toBeInTheDocument();
    expect(getByText("Pool and Ice Rink Loop")).toBeInTheDocument();
    expect(getByText("See more Minturn trails")).toBeInTheDocument();
    fireEvent.click(getByText("See more Minturn trails"));
    const leaflet = getByText("Leaflet");
    expect(leaflet).toBeInTheDocument();
    expect(getByText("M trail 1")).toBeInTheDocument();
    expect(queryByText("Big Mamba")).toBeNull();
    expect(queryByText("Pool and Ice Rink Loop")).toBeNull();
  });

  it("should be able to go to a different page", () => {
    const store = createStore(rootReducer, initialState);
    const history = createMemoryHistory();
    const { getByText, getByTestId, queryByText, debug } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(getByText("Big Mamba")).toBeInTheDocument();
    expect(getByText("Pool and Ice Rink Loop")).toBeInTheDocument();
    expect(getByText("See more Minturn trails")).toBeInTheDocument();
    fireEvent.click(getByText("See more Minturn trails"));
    const leaflet = getByText("Leaflet");
    expect(leaflet).toBeInTheDocument();
    expect(getByText("M trail 1")).toBeInTheDocument();
    expect(queryByText("Big Mamba")).toBeNull();
    expect(queryByText("Pool and Ice Rink Loop")).toBeNull();
    expect(getByText("Vail")).toBeInTheDocument();
    fireEvent.click(getByText("Vail"));
    expect(leaflet).toBeInTheDocument();
    expect(getByText("Big Mamba")).toBeInTheDocument();
    expect(queryByText("M trail 1")).toBeNull();
  });

  it("should show all trails when user clicks 'explore all trails'", () => {
    const store = createStore(rootReducer, initialState);
    const history = createMemoryHistory();
    const { getByText, getByTestId, queryByText, debug } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(getByText("Explore all trails")).toBeInTheDocument();
    fireEvent.click(getByText("Explore all trails"));
    const leaflet = getByText("Leaflet");
    expect(leaflet).toBeInTheDocument();
    expect(getByText("M trail 1")).toBeInTheDocument();
    expect(getByText("M trail 2")).toBeInTheDocument();
    expect(getByText("Big Mamba")).toBeInTheDocument();
    expect(getByText("Pool and Ice Rink Loop")).toBeInTheDocument();
  });
});
