import React from "react";
import { getAllByRole, render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <LoginForm />
        </UserProvider>
      </MemoryRouter>,
  );
});

it("displays properly", function () {
  const {getByText} = render(
      <MemoryRouter>
        <UserProvider>
          <LoginForm />
        </UserProvider>
      </MemoryRouter>,
  );

  console.log(getByText('Username'))

});

