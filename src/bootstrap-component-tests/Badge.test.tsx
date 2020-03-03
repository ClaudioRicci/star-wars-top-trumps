import React from "react";
import ReactDOM from "react-dom";
import Badge from "react-bootstrap/Badge";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Badge />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Matches snapshot", () => {
  const tree = renderer.create(<Badge></Badge>).toJSON();
  expect(tree).toMatchSnapshot();
});
