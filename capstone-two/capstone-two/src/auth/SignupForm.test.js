import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
render(
        <MemoryRouter>
        <UserProvider>
            <SignupForm />
        </UserProvider>
        </MemoryRouter>,
);
});