import React from "react";
import { queryAllByText, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Homepage from "./Homepage";
import { UserProvider } from "../testUtils";



it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Homepage />
        </UserProvider>
      </MemoryRouter>,
  );
});


it("displaying welcome properly", function () {
  const { queryAllByText } = render(
      <MemoryRouter>
        <UserProvider>
          <Homepage />
        </UserProvider>
      </MemoryRouter>,
  );

  console.log(queryAllByText('Welcome! test user'))

});
