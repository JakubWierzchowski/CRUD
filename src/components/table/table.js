import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebase-config";
import styless from "./TableStyle.module.css";
import "jspdf-autotable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditRows from "./EditRows";
import FilterExportPDF from "./FilterExportPDF";
import { EditButton, DeleteButton } from "./CrudButtonStyled";

export default function Table({ handleDelete, users, setusers, sumItem }) {
  const [editPart, seteditPart] = useState("");
  const [editFirm, seteditFirm] = useState("");
  const [editPrice, seteditPrice] = useState("");
  const [editCategories, seteditCategories] = useState("");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const [click, setClick] = useState(false);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...users].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setusers(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...users].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setusers(sorted);
      setOrder("ASC");
    }
  };

  const handleEdit = () => {
    setClick(true);
  };

  console.log(users);
  const updateUser = async (id, user, users) => {
    const userDoc = doc(db, "officeEq", id);
    const newFields = {
      part: editPart === "" ? "uzupełnij dane" : editPart,
      firm: editFirm === "" ? "uzupełnij dane" : editFirm,
      price: editPrice === "" ? "0" : Number(editPrice),
      categories: editCategories === "" ? "uzupełnij dane" : editCategories,
    };
    setClick(false);
    await updateDoc(userDoc, newFields);
  };

  const handleCancel = (id) => {
    setClick(false);
  };

  const handleDragEnd = (result) => {
    let tempuser = [...users];
    let [selecredRow] = tempuser.splice(result.source.index, 1);
    tempuser.splice(result.destination.index, 0, selecredRow);
    setusers(tempuser);
  };

  return (
    <>
      <FilterExportPDF setSearch={setSearch} users={users} />
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
                {users
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
                          seteditPart={seteditPart}
                          seteditFirm={seteditFirm}
                          seteditPrice={seteditPrice}
                          seteditCategories={seteditCategories}
                          updateUser={updateUser}
                          handleCancel={handleCancel}
                        >
                          {" "}
                        </EditRows>
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
                      {users.length}
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
