import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "..";

describe("List component test", () => {
  it("should be able to list data from back-end", async () => {
    const students = {
      id: "3ce1befe-5d3c-4d25-8e04-6e4071b882fb",
      email: "maick_a_s@msn.com",
      name: "Maick Souza",
      createdAt: new Date("2022-10-19T13:56:35.377Z"),
    };

    const { getByText } = render(<Home students={[students]} />);

    await waitFor(() => {
      expect(getByText("Maick Souza")).toBeDefined();
    });
  });
});
