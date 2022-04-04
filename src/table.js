import React, { useState } from "react";

import styled from "styled-components";
import styless from "./css/tableStyle.module.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Button = styled.button`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
`;
const Input = styled.input`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  margin: 20px;
  width: 400px;
  background-color: rgb(240, 243, 245);
`;

const DeleteButton = styled.button`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  background-color: red;
`;

export default function Table({ handleDelete, users, setusers, sum, len }) {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...users].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setusers(sorted);
      setOrder("DCS");
    }
    if (order === "DCS") {
      const sorted = [...users].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setusers(sorted);
      setOrder("ASC");
    }
  };

  // const categoriesSum = users.map((item) => parseFloat(item.price));
  {
    const x = users.map((item) => parseFloat(item.price));
  }

  const columns = [
    { title: "Jednostka", field: "user" },
    { title: "Firma/model", field: "klub" },
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
    <>
      {" "}
      {/* <button onClick{() => downloadPdf()}>Export</button> */}
      <div className={styless.filtrExpot}>
        <Input
          type="text"
          placeholder="Wpisz kategorię do filtrowania"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></Input>
        <button className={styless.buttonClass} onClick={() => downloadPdf()}>
          Export PDF
        </button>
      </div>
      <table className={styless.table}>
        <thead>
          <tr className={(styless.tr, styless.topTable)}>
            <th className={styless.td}>
              <strong>L.P</strong>
            </th>

            <th className={styless.td} onClick={() => sorting("user")}>
              <strong>Jednostka</strong>
            </th>

            <th className={styless.td} onClick={() => sorting("klub")}>
              <strong>Firma/Model</strong>
            </th>
            <th className={styless.td} onClick={() => sorting("price")}>
              <strong>Cena</strong>
            </th>

            <th className={styless.td} onClick={() => sorting("categories")}>
              <strong>Kategoria</strong>
            </th>

            <th className={styless.td}>
              <strong>Usuń/Edytuj</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((val) => {
              if (search == "") {
                return val;
              } else if (
                val.categories.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val, index) => (
              <>
                <tr className={styless.tr} key={val.id}>
                  <td className={styless.td}>{index + 1}</td>
                  <td className={styless.td} key={val.user}>
                    {val.user}
                  </td>
                  <td className={styless.td}>{val.klub} </td>
                  <td className={styless.td}>{Number(val.price)}</td>
                  <td className={styless.td}>{val.categories} </td>
                  <td>
                    <DeleteButton onClick={() => handleDelete(val.id)}>
                      delete
                    </DeleteButton>

                    {/* <Button
  className={styless.button2}
  onClick={() =>
    editDoc({
      user: part,
      klub: klub,
      price: price,
      categories: categories,
      id: dev.id,
    })
  }
>
  update
</Button> */}
                  </td>
                </tr>
              </>
            ))}
          <tr>
            <td colspan="6">
              <div className={styless.divText}>
                Łączny koszyk: {sum}$ dla ilości elementów : {users.length}
              </div>
            </td>
          </tr>
          {/* <tr>
            <div>
          
            </div>
          </tr> */}
        </tbody>
      </table>
      <div> </div>
    </>
  );
}
