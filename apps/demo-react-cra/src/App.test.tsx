import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { TestNodeLauncher } from '@fuel-ts/test-utils'

test("renders learn react link", () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test("can import TestNodeLauncher and not break build", async () => {
  const justToReferenceIt = TestNodeLauncher.launch;
})