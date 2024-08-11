import React from "react";
import { render } from "@testing-library/react";
import PlayCard from "./PlayCard";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";



it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <PlayCard title="title" id={12345}/>
        </UserProvider>
      </MemoryRouter>,
  );
});