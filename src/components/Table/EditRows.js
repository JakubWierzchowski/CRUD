import React from "react";
import styled from "styled-components";
import { EditButton, CancelButton } from "./CrudButtonStyled";

const EditInput = styled.input`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  font-size: 15px;
  margin: 0 auto;
  width: auto;
  background-color: #868484c7;
  ::placeholder {
    color: white;
  }
  @media (max-width: 768px) {
    font-size: 8px;
    padding: 4px;
    width: 40px;
  }
`;

export default function EditRows({
  val,
  index,
  seteditPart,
  seteditFirm,
  seteditPrice,
  seteditCategories,
  updateUser,
  handleCancel,
}) {
  return (
    <tr key={val.id}>
      <td>{index + 1}</td>
      <td>
        <EditInput
          placeholder={val.part}
          onChange={(event) => seteditPart(event.target.value)}
          required
        />
      </td>
      <td>
        <EditInput
          placeholder={val.firm}
          onChange={(event) => seteditFirm(event.target.value)}
          required
        />
      </td>
      <td>
        <EditInput
          placeholder={val.price}
          onChange={(event) => seteditPrice(event.target.value)}
          required
        />
      </td>
      <td>
        <EditInput
          placeholder={val.categories}
          onChange={(event) => seteditCategories(event.target.value)}
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
