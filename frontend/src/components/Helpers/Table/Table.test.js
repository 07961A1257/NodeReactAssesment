import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Table from "./Table";

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
  const fakeUser = [
    {
      name: "Test - I",
      email: "test@one.com",
      role: "employee",
    },
    {
      name: "Test - II",
      email: "test@two.com",
      role: "admin",
    },
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<Table users={fakeUser} />, container);
  });

  expect(container.querySelector("td").textContent).toBe(fakeUser[0].name);
  expect(container.querySelector("th").textContent).toBe("NAME");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
