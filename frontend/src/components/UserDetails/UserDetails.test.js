import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import UserDetails from "./UserDetails";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeLoading = "Loading...";
  // const fakeUser = {
  //   name: "Joni Baez",
  //   age: "32",
  //   address: "123, Charming Avenue",
  // };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeLoading),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<UserDetails />, container);
  });

  expect(container.querySelector("div").textContent).toBe(fakeLoading);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
