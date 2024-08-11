import React from "react";
import { render } from "@testing-library/react";
import SearchForm from "./SearchForm";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
render(
        <MemoryRouter>
        <UserProvider>
            <SearchForm />
        </UserProvider>
        </MemoryRouter>,
);
});