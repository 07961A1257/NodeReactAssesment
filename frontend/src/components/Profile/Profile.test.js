import React from "react";
import Profile from "./Profile";
import { render } from "@testing-library/react";

it("should match snapshot", () => {
  const { asFragment } = render(<Profile />);

  expect(asFragment()).toMatchSnapshot();
});
