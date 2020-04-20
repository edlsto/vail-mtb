import { favorites } from "../reducers/favorites";

describe("Reducer: favorites", () => {
  it("should return the initial state", () => {
    const result = favorites(undefined, {});

    expect(result).toEqual([]);
  });

  it("should add favorite", () => {
    const action = {
      type: "ADD_FAVORITE",
      id: 12345,
    };
    const result = favorites([], action);

    expect(result).toEqual([12345]);
  });

  it("should remove favorite", () => {
    const action = {
      type: "DELETE_FAVORITE",
      id: 123456,
    };
    const result = favorites([123456], action);

    expect(result).toEqual([]);
  });
});
