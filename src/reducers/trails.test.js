import { trails } from "../reducers/trails";

describe("Reducer: trails", () => {
  it("should return the initial state", () => {
    const result = trails(undefined, {});

    expect(result).toEqual([]);
  });

  it("should return updated state", () => {
    const action = {
      type: "GET_TRAILS",
      trails: [
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
      ],
    };
    const result = trails([], action);

    expect(result).toEqual([
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
  });
});
