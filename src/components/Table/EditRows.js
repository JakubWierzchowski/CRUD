import React, { useState } from "react";
import { EditButton, CancelButton, EditInput } from "./CrudButtonStyled";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebase-config";
export default function EditRows({ val, index, handleCancel, setClick }) {
  const [edit, setEdit] = useState({
    part: "",
    firm: "",
    price: "",
    categories: "",
  });
  const handleInputChange = (e) => {
    console.log(edit);
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };
  const updateUser = async (id) => {
    const userDoc = doc(db, "officeEq", id);
    const newFields = {
      ...edit,
    };
    setClick(false);
    await updateDoc(userDoc, newFields);
  };

  return (
    <tr key={val.id}>
      <td>{index + 1}</td>
      <td>
        <EditInput
          placeholder={val.part}
          onChange={handleInputChange}
          required
          name="part"
          value={edit.part}
        />
      </td>
      <td>
        <EditInput
          placeholder={val.firm}
          onChange={handleInputChange}
          required
          name="firm"
          value={edit.firm}
        />
      </td>
      <td>
        <EditInput
          placeholder={val.price}
          onChange={handleInputChange}
          required
          name="price"
          value={edit.price}
        />
      </td>
      <td>
        <EditInput
          placeholder={val.categories}
          onChange={handleInputChange}
          name="categories"
          value={edit.categories}
          required
        />
      </td>
      <td>
        <EditButton onClick={() => updateUser(val.id)}>Save</EditButton>
        <CancelButton onClick={handleCancel}>cancel</CancelButton>
      </td>
    </tr>
  );
}
