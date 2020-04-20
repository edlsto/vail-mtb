import React from "react";
import TrailsAreaPreview from "./TrailsAreaPreview";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";

describe("trail details tests", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      trails: [
        {
          id: 4362647,
          key: 4362647,
          name: "Pool and Ice Rink Loop",
          difficulty: "blue",
          location: "Vail, Colorado",
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

  it("should render the text we expect", async () => {
    const store = createStore(rootReducer, initialState);
    const { getByText, getByAltText, debug } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TrailsAreaPreview area={"vail"} />
        </BrowserRouter>
      </Provider>
    );
    debug();
    expect(getByText("Vail")).toBeInTheDocument();
    expect(getByText("See more Vail trails")).toBeInTheDocument();
    expect(getByText("Pool and Ice Rink Loop")).toBeInTheDocument();
    expect(getByText("8.6 miles")).toBeInTheDocument();
    expect(getByAltText("Pool and Ice Rink Loop")).toBeInTheDocument();
    expect(getByText("Big Mamba")).toBeInTheDocument();
    expect(getByText("3 miles")).toBeInTheDocument();
    expect(getByAltText("Big Mamba")).toBeInTheDocument();
  });
});
