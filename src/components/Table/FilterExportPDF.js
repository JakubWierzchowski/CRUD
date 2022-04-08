import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FilterExport, Input, Button } from "./FilterExportStyled";

export default function FilterExportPDF({ setSearch, users }) {
  const columns = [
    { title: "Jednostka", field: "part" },
    { title: "Firma/model", field: "firm" },
    { title: "Cena", field: "price", type: "numeric" },
    { title: "Kategoria", field: "categories" },
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Lista przedmiotów", 20, 10);
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: users,
    });
    doc.save("table.pdf");
  };
  return (
    <FilterExport>
      <Input
        type="text"
        placeholder="Wpisz kategorię do filtrowania"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></Input>
      <Button onClick={() => downloadPdf()}>Export PDF</Button>
    </FilterExport>
  );
}
