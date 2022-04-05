import React, { useState, useEffect, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "./firebase-config";
import SelectCategories from "./SelectCategories";

import styled from "styled-components";
import styless from "./css/tableStyle.module.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

const Input2 = styled.input`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  font-size: 15px;
  margin: 0 auto;
  width: 150px;

  background-color: #868484c7;
  ::placeholder {
    color: white;
  }
`;

const DeleteButton = styled.button`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  background-color: rgba(253, 7, 7, 0.704);
  margin: 5px;
`;
const EditButton = styled.button`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  background-color: rgba(18, 178, 7, 0.744);
  margin: 5px;
`;
const CancelButton = styled.button`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  background-color: #e8e8e8b7;
`;

export default function Table({
  handleDelete,
  users,
  setusers,
  sum,
  part,
  firm,
  price,
  categories,
}) {
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
  const [click, setClick] = useState(false);

  const handleEdit = (id, users) => {
    setClick(true);
  };

  const [editPart, seteditPart] = useState("");
  const [editFirm, seteditFirm] = useState("");
  const [editPrice, seteditPrice] = useState("");
  const [editCategories, seteditCategories] = useState("");

  const updateUser = async (id, user) => {
    const userDoc = doc(db, "officeEq", id);
    const newFields = {
      part: editPart === "" ? "uzupełnij pole" : editPart,
      firm: editFirm === "" ? "uzupełnij pole" : editFirm,
      price: editPrice === "" ? "0" : editPrice,
      categories: editCategories === "" ? "uzupełnij pole" : editCategories,
    };

    setClick(false);
    await updateDoc(userDoc, newFields);
  };

  const handleCancel = (id) => {
    setClick(false);
  };

  return (
    <>
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
      </div>{" "}
      <table className={styless.table}>
        <thead>
          <tr className={(styless.tr, styless.topTable)}>
            <th className={styless.td}>
              <strong>L.P</strong>
            </th>

            <th className={styless.td} onClick={() => sorting("part")}>
              <strong>Jednostka</strong>
            </th>

            <th className={styless.td} onClick={() => sorting("firm")}>
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
                {click ? (
                  <tr key={val.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Input2
                        placeholder={val.part}
                        onChange={(event) => seteditPart(event.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <Input2
                        placeholder={val.firm}
                        onChange={(event) => seteditFirm(event.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <Input2
                        placeholder={val.price}
                        onChange={(event) => seteditPrice(event.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <Input2
                        placeholder={val.categories}
                        onChange={(event) =>
                          seteditCategories(event.target.value)
                        }
                        required
                      />
                      {/* <SelectCategories
                        setShop={setShop}
                        onChange={(event) =>
                          seteditCategories(event.target.value)
                        }
                      />{" "}
                      {console.log(editCategories)} */}
                    </td>
                    <td>
                      <EditButton onClick={() => updateUser(val.id)}>
                        Save
                      </EditButton>
                      <CancelButton onClick={handleCancel}>cancel</CancelButton>
                    </td>
                  </tr>
                ) : (
                  <tr className={styless.tr} key={val.id}>
                    <td className={styless.td}>{index + 1}</td>
                    <td className={styless.td} key={val.part}>
                      {val.part}
                    </td>
                    <td className={styless.td}>{val.firm} </td>
                    <td className={styless.td}>{Number(val.price) + "$"}</td>
                    <td className={styless.td}>{val.categories} </td>
                    <td>
                      <DeleteButton onClick={() => handleDelete(val.id)}>
                        delete
                      </DeleteButton>
                      <EditButton onClick={() => handleEdit(val.id)}>
                        {" "}
                        Edit
                      </EditButton>
                    </td>
                  </tr>
                )}
              </>
            ))}

          <tr>
            <td colSpan="6">
              <div className={styless.divText}>
                Łączny koszyk: {sum}$ dla ilości elementów : {users.length}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div> </div>
    </>
  );
}
