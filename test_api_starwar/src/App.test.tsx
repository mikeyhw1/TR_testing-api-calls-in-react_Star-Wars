// import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
// import user from "@testing-library/user-event";
import App from "./App";
import { baseUrl } from "./App";
// import { act } from "react-dom/test-utils";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const server = setupServer(
    rest.get(`${baseUrl}/people/1/`, (req, res, ctx) => {
        return res(ctx.json({ name: "Luke Skywalker" }));
    })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("test for path '/people/1/'", () => {
    test("displays Star Wars characters", async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        });
    });
});
