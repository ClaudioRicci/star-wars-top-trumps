import React from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

jest.mock("axios");

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Matches snapshot", () => {
  const tree = renderer.create(<Button></Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
