import React, { useState } from "react";
// import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import FormField from "../molecules/FormField/FormField";
import AddItems from "../AddItems/AddItems";
import Table from "../Table/Table";
import Button from "./AddItems";

describe("Form Field", () => {
  it("Send Form Field", () => {
    render(
      <>
        <AddItems />
        {/* <Table /> */}
      </>
    );
    // fireEvent.change(screen.getByTestId("Nazwa"), {
    //   target: { value: "Karta" },
    // });
    // fireEvent.change(screen.getByTestId("Firma"), {
    //   target: { value: "Geforce" },
    // });
    // fireEvent.change(screen.getByTestId("Cena"), {
    //   target: { value: "" },
    // });
    fireEvent.click(screen.getByText("Wyślij"));

    // screen.getByText("Monitor");
  });
});
