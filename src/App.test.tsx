import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Matches snapshot", () => {
  const tree = renderer.create(<App></App>).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renders Loading Correctly", done => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("loading")).toHaveTextContent("LOADING...");
  done();
});

test("Renders Loading Correctly", done => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("title")).toHaveTextContent("Star Wars Top Trumps");
  done();
});
