import React from "react";
import TrailDetails from "./TrailDetails";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";

import { fetchTrail } from "../../ApiCalls";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";
jest.mock("../../ApiCalls");

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
    fetchTrail.mockResolvedValue({
      id: 4362647,
      name: "Pool and Ice Rink Loop",
      summary:
        "A challenging climb with great scenery leading to Eagle's best downhill flow trail.",
      difficulty: "blue",
      stars: 4.6,
      location: "Eagle, Colorado",
      url: "https://www.mtbproject.com/trail/4362647/pool-and-ice-rink-loop",
      imgMedium:
        "https://cdn-files.apstatic.com/mtb/,7019125_medium_1554924200.jpg",
      length: 8.6,
      ascent: 1146,
      descent: -1145,
      high: 7692,
      low: 6655,
      lat: 39.6431,
      lng: -106.816,
      starVotes: 109,
    });
  });

  it("should render the text we expect", async () => {
    const store = createStore(rootReducer, initialState);
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TrailDetails id={13489} />
        </BrowserRouter>
      </Provider>
    );
    await waitForElement(() => getByText("Pool and Ice Rink Loop"));
    expect(getByText("Pool and Ice Rink Loop")).toBeInTheDocument();
  });
});
