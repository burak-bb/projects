import React from "react";
import { render } from "@testing-library/react";
import PlayLists from "./PlayLists"
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <PlayLists />
        </UserProvider>
      </MemoryRouter>,
  );
});