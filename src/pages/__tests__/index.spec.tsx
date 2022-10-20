import { fireEvent, render, waitFor } from "@testing-library/react";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";
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

  it("should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText } = render(<Home students={[]} />);

    const serverMock = setupServer(
      rest.post(
        "http://localhost:3000/api/createStudentController",
        (req, res, ctx) => {
          return res(ctx.json({ name: "John Doe", email: "john@doe.test" }));
        }
      )
    );
    serverMock.listen();

    const response = await axios.post(
      "http://localhost:3000/api/createStudentController"
    );
    console.log(response.data);

    const inputNameElement = getByPlaceholderText("Digite o nome aqui");
    const inputEmailElement = getByPlaceholderText("Digite o email aqui");
    const addButton = getByText("Enviar");

    fireEvent.change(inputNameElement, { target: { value: "John Doe" } });
    fireEvent.change(inputEmailElement, { target: { value: "john@doe.test" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(getByText("John Doe")).toBeDefined();
    });
  });
});
