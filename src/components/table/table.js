import React, { useState, useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../../firebase-config";
import styless from "./tableStyle.module.css";
import "jspdf-autotable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditRows from "./EditRows";
import FilterExportPDF from "./FilterExportPDF";
import { EditButton, DeleteButton } from "./CrudButtonStyled";
import { onSnapshot, collection } from "firebase/firestore";

export default function Table({ sumItem }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const [click, setClick] = useState(false);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...items].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setItems(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...items].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setItems(sorted);
      setOrder("ASC");
    }
  };
  const handleDragEnd = (result) => {
    let tempuser = [...items];
    let [selecredRow] = tempuser.splice(result.source.index, 1);
    tempuser.splice(result.destination.index, 0, selecredRow);
    setItems(tempuser);
  };
  useEffect(
    () =>
      onSnapshot(collection(db, "officeEq"), (snapshot) =>
        setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  const handleDelete = async (id) => {
    const docRef = doc(db, "officeEq", id);
    await deleteDoc(docRef);
  };
  const handleEdit = () => {
    setClick(true);
  };
  const handleCancel = (id) => {
    setClick(false);
  };

  return (
    <>
      <FilterExportPDF setSearch={setSearch} items={items} />
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <table>
          <thead>
            <tr className={styless.topTable}>
              <th>
                <strong>L.P</strong>
              </th>
              <th onClick={() => sorting("part")}>
                <strong>Jednostka</strong>
              </th>
              <th onClick={() => sorting("firm")}>
                <strong>Firma Model</strong>
              </th>
              <th onClick={() => sorting("price")}>
                <strong>Cena</strong>
              </th>
              <th onClick={() => sorting("categories")}>
                <strong>Kategoria</strong>
              </th>
              <th>
                <strong>Usuń Edytuj</strong>
              </th>
            </tr>
          </thead>
          <Droppable droppableId="tbody">
            {(provider) => (
              <tbody ref={provider.innerRef} {...provider.droppableProps}>
                {items
                  .filter((val) => {
                    if (search == "") {
                      return val;
                    } else if (
                      val.categories
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((val, index) => (
                    <>
                      {click ? (
                        <EditRows
                          val={val}
                          index={index}
                          handleCancel={handleCancel}
                          setClick={setClick}
                        />
                      ) : (
                        <Draggable
                          draggableId={val.id}
                          key={val.id}
                          index={index}
                        >
                          {(provider) => (
                            <tr
                              key={val.id}
                              {...provider.draggableProps}
                              ref={provider.innerRef}
                            >
                              <td {...provider.dragHandleProps}>{index + 1}</td>
                              <td key={val.part}>{val.part}</td>
                              <td>{val.firm} </td>
                              <td>{Number(val.price) + "$"}</td>
                              <td>{val.categories} </td>
                              <td>
                                <DeleteButton
                                  onClick={() => handleDelete(val.id)}
                                >
                                  delete
                                </DeleteButton>
                                <EditButton onClick={() => handleEdit(val.id)}>
                                  {" "}
                                  Edit
                                </EditButton>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      )}
                    </>
                  ))}

                <tr>
                  <td colSpan="6">
                    <div className={styless.divText}>
                      Łączny koszyk: {sumItem}$ dla ilości elementów :{" "}
                      {items.length}
                    </div>
                  </td>
                </tr>
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </>
  );
}
