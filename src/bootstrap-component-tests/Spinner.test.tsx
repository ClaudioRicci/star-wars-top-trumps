import React from "react";
import ReactDOM from "react-dom";
import Spinner from "react-bootstrap/Spinner";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Spinner />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Matches snapshot", () => {
  const tree = renderer.create(<Spinner></Spinner>).toJSON();
  expect(tree).toMatchSnapshot();
});
