import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../index";

describe("List component test", () => {
  it("should render", () => {
    const { getByText } = render(<Home />);

    expect(getByText("Maick Souza")).toBeDefined();
  });
});
