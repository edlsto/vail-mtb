import React from "react";
import Area from "./Area";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";

describe("area tests", () => {
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

  it("should render the Vail trails", () => {
    const store = createStore(rootReducer, initialState);
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Area area="vail" />
        </BrowserRouter>
      </Provider>
    );
    const trailName = getByText("Big Mamba");
    expect(trailName).toBeInTheDocument();
  });

  it("should render the Eagle trails", () => {
    const store = createStore(rootReducer, initialState);
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Area area="eagle" />
        </BrowserRouter>
      </Provider>
    );
    const trailName = getByText("Pool and Ice Rink Loop");
    expect(trailName).toBeInTheDocument();
  });

  it("should show message when there are no favorites", () => {
    const store = createStore(rootReducer, initialState);
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Area pathname="/favorites" />
        </BrowserRouter>
      </Provider>
    );
    const favorites = getByText("You have no favorites!");
    expect(favorites).toBeInTheDocument();
  });

  it("should show favorites", () => {
    const store = createStore(rootReducer, {
      ...initialState,
      favorites: [4362647],
    });
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Area pathname="/favorites" />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Pool and Ice Rink Loop")).toBeInTheDocument();
    expect(queryByText("Big Mamba")).toBeNull();
  });
});
