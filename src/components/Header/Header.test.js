import React from "react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("header tests", () => {
  it("should render the text we expect", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const title = getByText("vAiL mTb");
    const favorites = getByText("Favorites");
    expect(title).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });
});
