import React from "react";
import TrailCard from "./TrailCard";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";

describe("trail card tests", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      favorites: [],
    };
  });

  it("should render the text we expect", () => {
    const store = createStore(rootReducer, initialState);
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TrailCard
            id={4362647}
            key={4362647}
            name={"Pool and Ice Rink Loop"}
            imgMedium={
              "https://cdn-files.apstatic.com/mtb/7019125_medium_1554924200.jpg"
            }
            difficulty={"blue"}
            length={8.6}
            location={"Eagle"}
          />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Pool and Ice Rink Loop")).toBeInTheDocument();
    expect(getByText("8.6 miles")).toBeInTheDocument();
    expect(getByAltText("Pool and Ice Rink Loop")).toBeInTheDocument();
  });
});
