import React from "react";
import Hero from "./Hero";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";
import { fetchTrails, fetchWeather, fetchTraffic } from "../../ApiCalls";
jest.mock("../../ApiCalls");

describe("hero tests", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      trails: [],
      favorites: [],
    };
    fetchTrails.mockResolvedValue([
      {
        id: 23955,
        name: "Bowmans Shortcut To Vail",
        difficulty: "black",
        location: "Vail, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/22603_medium_1554166507.jpg",
        lat: 39.5634,
        lng: -106.2686,
        length: 19.3,
        conditionStatus: "All Clear",
      },
      {
        id: 37146,
        name: "The Boneyard Loop",
        difficulty: "blue",
        location: "Eagle, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/63947_medium_1554167008.jpg",
        lat: 39.6576,
        lng: -106.8146,
        length: 5.8,
        conditionStatus: "Unknown",
      },
      {
        id: 7048693,
        name: "Meadow Mountain Loop",
        difficulty: "black",
        location: "Minturn, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "Unknown",
      },
      {
        id: 7048692,
        name: "Trail 3",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "Unknown",
      },
      {
        id: 7048691,
        name: "Trail 4",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "Unknown",
      },
    ]);
    fetchWeather.mockResolvedValue([
      {
        dt: 1587409200,
        temp: { max: 45 },
        weather: [
          {
            id: 600,
            main: "Snow",
            description: "light snow",
            icon: "13d",
          },
        ],
      },
      {
        dt: 1587409200,
        temp: { max: 45 },
        weather: [
          {
            id: 600,
            main: "Snow",
            description: "light snow",
            icon: "13d",
          },
        ],
      },
      {
        dt: 1587409200,
        temp: { max: 45 },
        weather: [
          {
            id: 600,
            main: "Snow",
            description: "light snow",
            icon: "13d",
          },
        ],
      },
    ]);
    fetchTraffic.mockResolvedValue(5618);
  });

  it("should render the text we expect", async () => {
    const store = createStore(rootReducer, initialState);

    const { getByText, getByAltText, debug } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Hero />
        </BrowserRouter>
      </Provider>
    );
    await waitForElement(() => getByText("45"));
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("less than ideal")).toBeInTheDocument();
    expect(getByText("45")).toBeInTheDocument();
    expect(getByText("light snow")).toBeInTheDocument();
    expect(getByText("94")).toBeInTheDocument();
    expect(getByText("Bowmans Shortcut To Vail")).toBeInTheDocument();
    expect(getByText("The Boneyard Loop")).toBeInTheDocument();
    expect(getByText("(That's a pretty quick trip!)")).toBeInTheDocument();
  });
});

describe("hero tests good conditions", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      trails: [],
      favorites: [],
    };
    fetchTrails.mockResolvedValue([
      {
        id: 23955,
        name: "Bowmans Shortcut To Vail",
        difficulty: "black",
        location: "Vail, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/22603_medium_1554166507.jpg",
        lat: 39.5634,
        lng: -106.2686,
        length: 19.3,
        conditionStatus: "All Clear",
      },
      {
        id: 37146,
        name: "The Boneyard Loop",
        difficulty: "blue",
        location: "Eagle, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/63947_medium_1554167008.jpg",
        lat: 39.6576,
        lng: -106.8146,
        length: 5.8,
        conditionStatus: "All Clear",
      },
      {
        id: 7048693,
        name: "Meadow Mountain Loop",
        difficulty: "black",
        location: "Minturn, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
      {
        id: 7048692,
        name: "Trail 3",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
      {
        id: 4,
        name: "Trail 4",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
      {
        id: 5,
        name: "Trail 5",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
      {
        id: 6,
        name: "Trail 6",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
      {
        id: 7,
        name: "Trail 7",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
      {
        id: 8,
        name: "Trail 8",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
      {
        id: 9,
        name: "Trail 9",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
      {
        id: 10,
        name: "Trail 10",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
      {
        id: 11,
        name: "Trail 11",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "All Clear",
      },
    ]);
    fetchWeather.mockResolvedValue([
      {
        dt: 1587409200,
        temp: { max: 75 },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "13d",
          },
        ],
      },
      {
        dt: 1587409200,
        temp: { max: 75 },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "13d",
          },
        ],
      },
      {
        dt: 1587409200,
        temp: { max: 45 },
        weather: [
          {
            id: 600,
            main: "Snow",
            description: "light snow",
            icon: "13d",
          },
        ],
      },
    ]);
    fetchTraffic.mockResolvedValue(5218);
  });

  it("should render 'great' for good conditions", async () => {
    const store = createStore(rootReducer, initialState);

    const { getByText, getByAltText, debug } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Hero />
        </BrowserRouter>
      </Provider>
    );
    await waitForElement(() => getByText("75"));
    expect(getByText("11")).toBeInTheDocument();
    expect(getByText("0")).toBeInTheDocument();
    expect(getByText("great")).toBeInTheDocument();
    expect(getByText("75")).toBeInTheDocument();
    expect(getByText("clear sky")).toBeInTheDocument();
    expect(getByText("87")).toBeInTheDocument();
    expect(getByText("(That's a pretty quick trip!)")).toBeInTheDocument();
    expect(getByText("Bowmans Shortcut To Vail")).toBeInTheDocument();
    expect(getByText("The Boneyard Loop")).toBeInTheDocument();
  });
});

describe("hero tests OK conditions", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      trails: [],
      favorites: [],
    };
    fetchTrails.mockResolvedValue([
      {
        id: 23955,
        name: "Bowmans Shortcut To Vail",
        difficulty: "black",
        location: "Vail, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/22603_medium_1554166507.jpg",
        lat: 39.5634,
        lng: -106.2686,
        length: 19.3,
        conditionStatus: "All Clear",
      },
      {
        id: 37146,
        name: "The Boneyard Loop",
        difficulty: "blue",
        location: "Eagle, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/63947_medium_1554167008.jpg",
        lat: 39.6576,
        lng: -106.8146,
        length: 5.8,
        conditionStatus: "Unknown",
      },
      {
        id: 7048693,
        name: "Meadow Mountain Loop",
        difficulty: "black",
        location: "Minturn, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "Unknown",
      },
      {
        id: 7048692,
        name: "Trail 3",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "Unknown",
      },
      {
        id: 7048691,
        name: "Trail 4",
        difficulty: "black",
        location: "Avon, Colorado",
        imgMedium:
          "https://cdn-files.apstatic.com/mtb/7032110_medium_1563745883.jpg",
        lat: 39.6066,
        lng: -106.4445,
        length: 10.3,
        conditionStatus: "Unknown",
      },
    ]);
    fetchWeather.mockResolvedValue([
      {
        dt: 1587409200,
        temp: { max: 75 },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "13d",
          },
        ],
      },
      {
        dt: 1587409200,
        temp: { max: 75 },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "13d",
          },
        ],
      },
      {
        dt: 1587409200,
        temp: { max: 45 },
        weather: [
          {
            id: 600,
            main: "Snow",
            description: "light snow",
            icon: "13d",
          },
        ],
      },
    ]);
    fetchTraffic.mockResolvedValue(5618);
  });

  it("should render the text we expect", async () => {
    const store = createStore(rootReducer, initialState);

    const { getByText, getByAltText, debug } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Hero />
        </BrowserRouter>
      </Provider>
    );
    await waitForElement(() => getByText("75"));
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("(Great weather for biking!)")).toBeInTheDocument();
    expect(getByText("OK")).toBeInTheDocument();
    expect(getByText("75")).toBeInTheDocument();
    expect(getByText("clear sky")).toBeInTheDocument();
    expect(getByText("94")).toBeInTheDocument();
    expect(getByText("Bowmans Shortcut To Vail")).toBeInTheDocument();
    expect(getByText("The Boneyard Loop")).toBeInTheDocument();
    expect(getByText("(That's a pretty quick trip!)")).toBeInTheDocument();
  });
});
