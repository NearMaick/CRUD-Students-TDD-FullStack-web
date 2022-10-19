import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../index";

describe("List component test", () => {
  it("should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText } = render(<Home />);

    const inputElement = getByPlaceholderText("Digite o nome aqui");
    const addButton = getByText("Enviar");

    fireEvent.change(inputElement, { target: { value: "Novo" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(getByText("Novo")).toBeDefined();
    });
  });
});
