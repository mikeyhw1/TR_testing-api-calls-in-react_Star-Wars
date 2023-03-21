import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import App from "./App";

const server = setupServer(
    rest.get("https://swapi.dev/api/people/1/", (req, res, ctx) => {
        if (req.url.searchParams.get("status") === "500") {
            return res(ctx.status(500));
        } else {
            return res(ctx.status(200), ctx.json({ name: "Luke Skywalker" }));
        }
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("should display Luke Skywalker", async () => {
    render(<App />);
    await waitFor(() => {
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });
});

test("should display error message 500", async () => {
    server.use(
        rest.get("https://swapi.dev/api/people/1/", (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );
    render(<App />);
    expect(await screen.findByText("500: Internal Server Error")).toBeInTheDocument();
});

test("should display error message 418", async () => {
    server.use(
        rest.get("https://swapi.dev/api/people/1/", (req, res, ctx) => {
            return res(ctx.status(418));
        })
    );
    render(<App />);
    expect(await screen.findByText("418: I'm a tea pot")).toBeInTheDocument();
});
